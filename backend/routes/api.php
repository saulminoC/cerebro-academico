<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KardexController;
use App\Http\Controllers\DashboardController;

// Rutas Públicas (Las que usa React para acceder)
Route::post('/registro', [AuthController::class, 'registrar']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas Privadas (Protegidas por el cadenero Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // Ruta para saber quién está logueado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::post('/kardex/procesar', [KardexController::class, 'procesar']);

    Route::get('/dashboard', [DashboardController::class, 'resumen']);

    Route::get('/mapa-curricular', [DashboardController::class, 'mapa']);

    Route::get('/rutas-progreso', [DashboardController::class, 'rutasProgreso']);

    Route::get('/historial-kardex', [DashboardController::class, 'historialDetallado']);
});
