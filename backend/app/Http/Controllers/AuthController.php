<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // --- FUNCIÓN PARA REGISTRAR ---
    public function registrar(Request $request)
    {
        // 1. Validar que nos manden lo necesario
        $request->validate([
            'matricula' => 'required|string|max:9|unique:users,matricula',
            'password' => 'required|string|min:6'
        ]);

        // 2. Crear al usuario en la Base de Datos
        $user = User::create([
            'matricula' => $request->matricula,
            'nombre' => 'Alumno', // Dato por defecto para no romper el diseño
            'apellidos' => 'FCC', // Dato por defecto
            'email' => $request->matricula . '@alumno.buap.mx', // Correo autogenerado
            'password' => Hash::make($request->password), // Contraseña encriptada
        ]);

        // 3. Crear un token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4. Responderle a React
        return response()->json([
            'mensaje' => '¡Bienvenido a la manada, viejón!',
            'usuario' => $user,
            'token' => $token
        ], 201);
    }

    // --- FUNCIÓN PARA INICIAR SESIÓN ---
    public function login(Request $request)
    {
        $request->validate([
            'matricula' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('matricula', $request->matricula)->first();

        // Verificar si existe y la contraseña cuadra
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'matricula' => ['Las credenciales son incorrectas, compa.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Sesión iniciada correctamente',
            'usuario' => $user,
            'token' => $token
        ]);
    }
}
