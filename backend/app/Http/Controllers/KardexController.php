<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Smalot\PdfParser\Parser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class KardexController extends Controller
{
    // ─────────────────────────────────────────────
    // Constantes: un solo lugar para cambiar el
    // comportamiento del parser sin tocar la lógica.
    // ─────────────────────────────────────────────
    private const CHUNK_SIZE = 200;   // Aumentado: PDFs anchos necesitan más contexto
    private const MIN_GRADE  = 5;
    private const MAX_GRADE  = 10;

    // MEJORA 1 ─ Tipos de resultado de una materia
    private const ESTADO_APROBADA  = 'aprobada';
    private const ESTADO_REPROBADA = 'reprobada';
    private const ESTADO_EN_CURSO  = 'cursando'; // Valor real del ENUM en la BD

    /**
     * Punto de entrada del controlador.
     * Solo orquesta; la lógica pesada va en métodos privados.
     */
    public function procesar(Request $request): JsonResponse
    {
        // MEJORA 2 ─ Validación más estricta:
        //   - Se agrega 'file' para confirmar que el campo existe y es un archivo.
        //   - 'mimes' verifica la extensión; 'mimetypes' verifica el MIME real del binario.
        //   Ambas son necesarias: un atacante puede subir un .exe renombrado a .pdf.
        $request->validate([
            'kardex' => [
                'required',
                'file',
                'mimes:pdf',
                'mimetypes:application/pdf',
                'max:5120',
            ],
        ]);

        $usuarioId = $request->user()->id;

        try {
            // MEJORA 3 ─ El texto crudo se extrae en un método separado
            //   para que pueda ser probado (unit test) de forma independiente.
            $textoLimpio = $this->extractCleanText($request->file('kardex')->path());

            $materias = DB::table('materias')->get();

            // MEJORA 4 ─ Procesamos antes de abrir la transacción.
            //   Si el parser falla, nunca tocamos la DB.
            $avancesNuevos = $this->buildAvances($textoLimpio, $materias, $usuarioId);

            // MEJORA 5 ─ Transacción más corta: solo operaciones de escritura.
            $materiasProcesadas = $this->saveAvances($usuarioId, $avancesNuevos);

            return response()->json([
                'mensaje'             => 'Kardex auditado correctamente.',
                'materias_encontradas' => $materiasProcesadas,
            ]);

        } catch (Exception $e) {
            // MEJORA 6 ─ Loguear el error con contexto para poder depurarlo.
            //   En producción nunca se expone $e->getMessage() al cliente.
            Log::error('KardexController: error al procesar PDF', [
                'user_id' => $usuarioId,
                'error'   => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return response()->json([
                'mensaje' => 'Hubo un error procesando el Kardex. Intenta de nuevo.',
            ], 500);
        }
    }

    // ─────────────────────────────────────────────
    // MÉTODOS PRIVADOS
    // ─────────────────────────────────────────────

    /**
     * MEJORA 7 ─ Extracción de texto aislada.
     * Si Smalot lanza una excepción, sube hasta procesar() que la captura.
     */
    private function extractCleanText(string $pdfPath): string
    {
        $parser   = new Parser();
        $pdf      = $parser->parseFile($pdfPath);
        $textoCrudo = $pdf->getText();

        if (empty(trim($textoCrudo))) {
            throw new Exception('El PDF no contiene texto legible. ¿Está escaneado como imagen?');
        }

        // El "blindaje" original: todo a mayúsculas, sin espacios.
        // Conservamos esta lógica porque es correcta y robusta.
        return strtoupper(preg_replace('/\s+/', '', $textoCrudo));
    }

    /**
     * Construcción del array de avances desacoplada de la DB.
     *
     * BUG RAÍZ CORREGIDO: El kardex de la BUAP tiene dos columnas (semestre
     * izquierdo y derecho). Smalot extrae el texto intercalando líneas de
     * ambas columnas, por lo que el orden físico en el string NO es cronológico.
     * Tomar la "última aparición" devuelve una fila aleatoria del PDF, no la
     * más reciente. Solución: evaluar TODAS las apariciones y elegir el mejor
     * resultado según jerarquía: aprobada > en_curso > reprobada.
     *
     * @param  \Illuminate\Support\Collection $materias
     * @return array<int, array<string, mixed>>
     */
    private function buildAvances(string $textoLimpio, $materias, int $usuarioId): array
    {
        $avances = [];
        $now     = now();

        foreach ($materias as $materia) {
            $claveLimpia = strtoupper(preg_replace('/\s+/', '', $materia->clave));
            $chunks      = $this->findAllChunks($textoLimpio, $claveLimpia);

            if (empty($chunks)) {
                continue;
            }

            // Evaluamos TODOS los chunks y elegimos el mejor resultado
            $resultado = $this->elegirMejorResultado($chunks);

            $avances[] = [
                'user_id'            => $usuarioId,
                'materia_id'         => $materia->id,
                'estado'             => $resultado['estado'],
                'calificacion'       => $resultado['calificacion'],
                'periodo_aprobacion' => 'Extraído de PDF',
                'created_at'         => $now,
                'updated_at'         => $now,
            ];
        }

        return $avances;
    }

    /**
     * Evalúa todos los chunks de una materia y devuelve el mejor resultado.
     *
     * Jerarquía:
     *   1. aprobada   → la materia fue pasada en algún intento (la que tenga mayor nota)
     *   2. en_curso   → actualmente inscrita, sin calificación aún
     *   3. reprobada  → todos los intentos fallaron (tomamos la última calificación registrada)
     *
     * Esto resuelve el problema de columnas del PDF de la BUAP: sin importar
     * en qué orden físico Smalot extraiga las filas, si existe UNA aprobada,
     * esa es la que prevalece.
     *
     * @param  string[] $chunks
     * @return array{calificacion: float, estado: string}
     */
    private function elegirMejorResultado(array $chunks): array
    {
        $aprobadas  = [];
        $enCurso    = [];
        $reprobadas = [];

        foreach ($chunks as $chunk) {
            $resultado = $this->parseCalificacion($chunk);

            match ($resultado['estado']) {
                self::ESTADO_APROBADA  => $aprobadas[]  = $resultado,
                self::ESTADO_EN_CURSO  => $enCurso[]    = $resultado,
                self::ESTADO_REPROBADA => $reprobadas[] = $resultado,
            };
        }

        // Prioridad 1: aprobada con la calificación más alta
        if (!empty($aprobadas)) {
            return array_reduce($aprobadas, function (?array $mejor, array $actual): array {
                return ($mejor === null || $actual['calificacion'] > $mejor['calificacion'])
                    ? $actual
                    : $mejor;
            }, null);
        }

        // Prioridad 2: en curso (inscrita actualmente)
        if (!empty($enCurso)) {
            return reset($enCurso);
        }

        // Prioridad 3: reprobada (todos los intentos fallaron)
        return end($reprobadas);
    }

    /**
     * Devuelve todos los chunks de texto que siguen a una clave de materia.
     *
     * @return string[]
     */
    private function findAllChunks(string $texto, string $clave): array
    {
        $chunks = [];
        $offset = 0;
        $len    = strlen($clave);

        while (($pos = strpos($texto, $clave, $offset)) !== false) {
            $chunks[] = substr($texto, $pos + $len, self::CHUNK_SIZE);
            $offset   = $pos + $len;
        }

        return $chunks;
    }

    /**
     * MEJORA 10 ─ Regex más robusto y comentado.
     *
     * Explicación del patrón:
     *   (\d{1,2}\.00)        → Créditos: 2.00, 4.00, 6.00, etc.
     *   (0[5-9]|10|AC|NA|NP) → Calificación justo antes o después de los créditos.
     *
     * También captura "SD" (sin derecho) que algunas universidades usan.
     *
     * @return array{calificacion: float, estado: string}
     */
    private function parseCalificacion(string $chunk): array
    {
        // MEJORA 11 ─ Patrón nombrado (?P<cal>...) para legibilidad.
        //   Acepta la calificación antes O después de los créditos.
        $patron = '/(?P<cal1>0[5-9]|10|AC|NA|NP|SD)?'
                . '\d{1,2}\.00'
                . '(?P<cal2>0[5-9]|10|AC|NA|NP|SD)?/i';

        $calCruda = '';

        if (preg_match($patron, $chunk, $matches)) {
            // Toma el primer grupo que tenga valor
            $calCruda = !empty($matches['cal1'])
                ? $matches['cal1']
                : ($matches['cal2'] ?? '');
        }

        return $this->clasificar(strtoupper($calCruda));
    }

    /**
     * MEJORA 12 ─ Lógica de clasificación en su propio método.
     *   Fácil de extender (p.ej. agregar 'NR' o 'EX' en el futuro).
     *
     * @return array{calificacion: float, estado: string}
     */
    private function clasificar(string $calCruda): array
    {
        // Sin calificación → la materia está inscrita actualmente
        if ($calCruda === '') {
            return ['calificacion' => 0.0, 'estado' => self::ESTADO_EN_CURSO];
        }

        // Acreditada por equivalencia o reconocimiento
        if ($calCruda === 'AC') {
            return ['calificacion' => 10.0, 'estado' => self::ESTADO_APROBADA];
        }

        // NA = No Acreditada, NP = No Presentó, SD = Sin Derecho
        if (in_array($calCruda, ['NA', 'NP', 'SD'], true)) {
            return ['calificacion' => 5.0, 'estado' => self::ESTADO_REPROBADA];
        }

        // Numérica
        if (is_numeric($calCruda)) {
            $valor = (float) $calCruda;
            // MEJORA 13 ─ Clamping defensivo: descarta valores imposibles del PDF
            $valor  = max(self::MIN_GRADE, min(self::MAX_GRADE, $valor));
            $estado = ($valor >= 6.0) ? self::ESTADO_APROBADA : self::ESTADO_REPROBADA;

            return ['calificacion' => $valor, 'estado' => $estado];
        }

        // Cualquier otro token inesperado → tratar como en curso para no perder datos
        Log::warning('KardexController: calificación no reconocida', ['valor' => $calCruda]);

        return ['calificacion' => 0.0, 'estado' => self::ESTADO_EN_CURSO];
    }

    /**
     * MEJORA 14 ─ Persistencia atómica con upsert.
     *   - Transacción corta (solo escrituras).
     *   - delete() + insert() en bulk en lugar de N inserts individuales.
     *   - Retorna el conteo real de filas guardadas.
     */
    private function saveAvances(int $usuarioId, array $avances): int
    {
        if (empty($avances)) {
            return 0;
        }

        DB::beginTransaction();

        try {
            DB::table('avances')->where('user_id', $usuarioId)->delete();

            // MEJORA 15 ─ Insert en lotes de 100 para no saturar el buffer de MySQL
            //   con kardex que tengan 60+ materias.
            foreach (array_chunk($avances, 100) as $lote) {
                DB::table('avances')->insert($lote);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e; // Re-lanzamos para que procesar() lo loguee
        }

        return count($avances);
    }
}
