<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Smalot\PdfParser\Parser;
use App\Models\Materia;
use Illuminate\Support\Facades\DB;
use Exception;

class KardexController extends Controller
{
    public function procesar(Request $request)
    {
        $request->validate([
            'kardex' => 'required|mimes:pdf|max:5120',
        ]);

        try {
            // 1. Extraer el texto crudo del PDF
            $parser = new Parser();
            $pdf = $parser->parseFile($request->file('kardex')->path());
            $textoCrudo = $pdf->getText();

            // 2. MAGIA NEGRA: Limpiamos el texto del PDF para quitarle TODOS los espacios y saltos de línea
            // Así "CCOS 001" y "CCOS001" y "CCOS  001\n" se vuelven simplemente "CCOS001"
            $textoLimpio = preg_replace('/\s+/', '', $textoCrudo);

            $materias = DB::table('materias')->get();
            $materiasAprobadas = 0;
            $usuarioId = $request->user()->id;

            DB::beginTransaction();

            // Limpiamos el avance anterior
            DB::table('avances')->where('user_id', $usuarioId)->delete();

            // 3. El Cerebro 2.0 en acción
            foreach ($materias as $materia) {
                // Limpiamos también la clave de la base de datos (Ej: de "CCOS 010" a "CCOS010")
                $claveLimpia = preg_replace('/\s+/', '', $materia->clave);

                // Ahora buscamos "CCOS010" dentro del PDF limpio
                if (str_contains($textoLimpio, $claveLimpia)) {

                    DB::table('avances')->insert([
                        'user_id' => $usuarioId,
                        'materia_id' => $materia->id,
                        'estado' => 'aprobada',
                        // Como tienes 7.41 de promedio general en tu Kardex, le ponemos eso base por ahora
                        'calificacion' => 7.41,
                        'periodo_aprobacion' => 'Extraído de PDF',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $materiasAprobadas++;
                }
            }

            DB::commit();

            return response()->json([
                'mensaje' => 'Cerebro Académico finalizó el análisis.',
                'materias_encontradas' => $materiasAprobadas
            ]);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'mensaje' => 'Hubo un error procesando el Kardex, compa.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
