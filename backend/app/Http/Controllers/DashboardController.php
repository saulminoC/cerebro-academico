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

        // 4. Materias Sugeridas (Buscamos 3 materias avanzadas que AÚN NO haya cursado)
        $materiasCursadasIds = $avances->pluck('materia_id')->toArray();

        $sugeridas = DB::table('materias')
            ->whereNotIn('id', $materiasCursadasIds)
            ->where('semestre_sugerido', '>=', 8) // Filtramos por optativas o avanzadas
            ->inRandomOrder()
            ->limit(3)
            ->get()
            ->map(function($materia) {
                return [
                    'clave' => $materia->clave,
                    'nombre' => $materia->nombre,
                    'tipo' => 'Optativa',
                    'ruta' => 'Especialidad' // Etiqueta genérica por ahora
                ];
            });

        // 5. Devolvemos todo empaquetado a React
        return response()->json([
            'promedio' => number_format($promedio, 2),
            'creditos_aprobados' => $creditosAprobados,
            'creditos_totales' => $creditosTotales,
            'porcentaje' => $porcentaje,
            'materias_sugeridas' => $sugeridas
        ]);
    }
}
