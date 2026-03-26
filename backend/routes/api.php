<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KardexController;

// Rutas Públicas (Las que usa React para acceder)
Route::post('/registro', [AuthController::class, 'registrar']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas Privadas (Protegidas por el cadenero Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // Ruta para saber quién está logueado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // LA NUEVA RUTA DEL KARDEX (¡Ahora sí está bien puesta!)
    Route::post('/kardex/procesar', [KardexController::class, 'procesar']);

});
