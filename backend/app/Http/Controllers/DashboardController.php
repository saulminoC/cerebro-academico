<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function resumen(Request $request)
    {
        $usuarioId = $request->user()->id;

        // 1. Obtenemos las materias aprobadas cruzando avances con el catálogo
        $avances = DB::table('avances')
            ->join('materias', 'avances.materia_id', '=', 'materias.id')
            ->where('avances.user_id', $usuarioId)
            ->where('avances.estado', 'aprobada')
            ->get();

        // 2. Calculamos los créditos y el promedio
        $creditosAprobados = $avances->sum('creditos');
        $promedio = $avances->count() > 0 ? $avances->avg('calificacion') : 0;

        // 3. Créditos mínimos para titulación (Minerva 2016)
        $creditosTotales = 266;
        $porcentaje = ($creditosTotales > 0) ? round(($creditosAprobados / $creditosTotales) * 100) : 0;

        // 4. Materias Sugeridas Inteligentes
        // En el método resumen() — línea ~20
        $materiasCursadasIds = DB::table('avances')
            ->where('user_id', $usuarioId)
            ->whereIn('estado', ['aprobada', 'cursando']) // ← agrega 'cursando'
            ->pluck('materia_id')
            ->toArray();

        // Obtenemos todo lo que NO ha cursado
        $materiasFaltantes = DB::table('materias')
            ->whereNotIn('id', $materiasCursadasIds)
            ->get();

        // En Minerva 2016, asumimos que semestre 9 son optativas, el resto obligatorias
        $obligatoriasFaltantes = $materiasFaltantes->where('semestre_sugerido', '<', 9);
        $optativasFaltantes = $materiasFaltantes->where('semestre_sugerido', '>=', 9);

        $sugeridas = collect();

        if ($obligatoriasFaltantes->count() > 0) {
            // Regla 1: Si debe obligatorias, mostrarlas primero ordenadas por semestre
            $sugeridas = $obligatoriasFaltantes->sortBy('semestre_sugerido')->take(3);
        } else {
            // Regla 2: Si solo le faltan optativas, priorizar stack web y datos
            $sugeridas = $optativasFaltantes->filter(function ($materia) {
                $nombre = strtolower($materia->nombre);
                return str_contains($nombre, 'web') ||
                       str_contains($nombre, 'datos') ||
                       str_contains($nombre, 'software') ||
                       str_contains($nombre, 'minería');
            })->take(3);

            // Rellenar si no hay suficientes coincidencias
            if ($sugeridas->count() < 3) {
                $relleno = $optativasFaltantes->whereNotIn('id', $sugeridas->pluck('id'))->take(3 - $sugeridas->count());
                $sugeridas = $sugeridas->merge($relleno);
            }
        }

        // Formatear para React
        $sugeridasFormateadas = $sugeridas->map(function($materia) {
            return [
                'clave' => $materia->clave,
                'nombre' => $materia->nombre,
                'tipo' => $materia->semestre_sugerido >= 9 ? 'OPTATIVA' : 'OBLIGATORIA',
                'ruta' => 'Sugerida'
            ];
        })->values();

        // 5. Devolvemos todo empaquetado a React
        return response()->json([
            'promedio' => number_format($promedio, 2),
            'creditos_aprobados' => $creditosAprobados,
            'creditos_totales' => $creditosTotales,
            'porcentaje' => $porcentaje,
            'materias_sugeridas' => $sugeridasFormateadas // Pasamos el nuevo arreglo aquí
        ]);
    }

    // --- FUNCIÓN PARA EL MAPA CURRICULAR ---
    public function mapa(Request $request)
    {
        $usuarioId = $request->user()->id;

        // 1. Traemos todo el catálogo ordenado por semestre
        $materias = DB::table('materias')->orderBy('semestre_sugerido')->get();

        // 2. Traemos los avances del alumno y los indexamos por el ID de la materia
        $avances = DB::table('avances')->where('user_id', $usuarioId)->get()->keyBy('materia_id');

        // 3. Cruzamos los datos
        $mapa = $materias->map(function($m) use ($avances) {
            $estado = $avances->has($m->id) ? $avances->get($m->id)->estado : 'pendiente';
            return [
                'id' => $m->id,
                'clave' => $m->clave,
                'nombre' => $m->nombre,
                'creditos' => $m->creditos,
                'semestre' => $m->semestre_sugerido,
                'estado' => $estado // 'aprobada' o 'pendiente'
            ];
        });



        // 4. Agrupamos las materias por semestre (1, 2, 3...) para que React las dibuje en columnas
        return response()->json($mapa->groupBy('semestre'));
    }

    // --- FUNCIÓN PARA RUTAS OPTATIVAS ---
    public function rutasProgreso(Request $request)
    {
        $usuarioId = $request->user()->id;

        // Traemos los nombres de las materias que ya pasaste, en minúsculas para buscar fácil
        $materiasAprobadas = DB::table('avances')
            ->join('materias', 'avances.materia_id', '=', 'materias.id')
            ->where('avances.user_id', $usuarioId)
            ->where('avances.estado', 'aprobada')
            ->pluck('materias.nombre')
            ->map(function($nombre) { return strtolower($nombre); })
            ->toArray();

        // Diccionarios de palabras clave por especialidad
        $keywordsWeb = ['web', 'distribuidos', 'interacción', 'móviles', 'nube', 'software'];
        $keywordsDatos = ['datos', 'minería', 'estadística', 'inteligencia', 'aprendizaje', 'artificial'];

        $materiasWeb = 0;
        $materiasDatos = 0;

        // Evaluamos tu historial
        foreach ($materiasAprobadas as $materia) {
            foreach ($keywordsWeb as $kw) {
                if (str_contains($materia, $kw)) { $materiasWeb++; break; }
            }
            foreach ($keywordsDatos as $kw) {
                if (str_contains($materia, $kw)) { $materiasDatos++; break; }
            }
        }

        // Asumimos que con 5 materias de la especialidad ya tienes el 100% del perfil
        return response()->json([
            'desarrollo_web' => min(($materiasWeb / 5) * 100, 100),
            'ciencia_datos' => min(($materiasDatos / 5) * 100, 100),
            'conteo_web' => $materiasWeb,
            'conteo_datos' => $materiasDatos
        ]);
    }

    // --- FUNCIÓN PARA ANÁLISIS DE KARDEX DETALLADO ---
    public function historialDetallado(Request $request)
    {
        $usuarioId = $request->user()->id;

        $historial = DB::table('avances')
            ->join('materias', 'avances.materia_id', '=', 'materias.id')
            ->where('avances.user_id', $usuarioId)
            ->select(
                'materias.clave',
                'materias.nombre',
                'materias.creditos',
                'avances.calificacion',
                'avances.estado'
            )
            ->orderBy('materias.semestre_sugerido', 'asc')
            ->get();

        return response()->json($historial);
    }
}
