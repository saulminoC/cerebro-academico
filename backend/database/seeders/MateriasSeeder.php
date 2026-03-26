<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MateriasSeeder extends Seeder
{
    public function run(): void
    {
        $materias = [
            // --- ÁREA DE FORMACIÓN GENERAL (Nivel Básico) ---
            ['clave' => 'FGUS 001', 'nombre' => 'Formación Humana y Social', 'creditos' => 4, 'semestre_sugerido' => 1],
            ['clave' => 'FGUS 002', 'nombre' => 'DHPC', 'creditos' => 4, 'semestre_sugerido' => 2],
            ['clave' => 'FGUS 004', 'nombre' => 'Lengua Extranjera I', 'creditos' => 4, 'semestre_sugerido' => 1],
            ['clave' => 'FGUS 005', 'nombre' => 'Lengua Extranjera II', 'creditos' => 4, 'semestre_sugerido' => 2],
            ['clave' => 'FGUS 006', 'nombre' => 'Lengua Extranjera III', 'creditos' => 4, 'semestre_sugerido' => 3],
            ['clave' => 'FGUS 007', 'nombre' => 'Lengua Extranjera IV', 'creditos' => 4, 'semestre_sugerido' => 4],

            // --- CIENCIAS BÁSICAS (Nivel Básico) ---
            ['clave' => 'CCOS 002', 'nombre' => 'Matemáticas Elementales', 'creditos' => 6, 'semestre_sugerido' => 1],
            ['clave' => 'CCOS 007', 'nombre' => 'Cálculo Diferencial', 'creditos' => 6, 'semestre_sugerido' => 2],
            ['clave' => 'CCOS 008', 'nombre' => 'Cálculo Integral', 'creditos' => 6, 'semestre_sugerido' => 3],
            ['clave' => 'CCOS 003', 'nombre' => 'Álgebra Superior', 'creditos' => 6, 'semestre_sugerido' => 1],
            ['clave' => 'CCOS 006', 'nombre' => 'Álgebra Lineal', 'creditos' => 6, 'semestre_sugerido' => 2],

            // --- CIENCIAS DE LA COMPUTACIÓN (Nivel Básico) ---
            ['clave' => 'CCOS 001', 'nombre' => 'Metodología de la Programación', 'creditos' => 4, 'semestre_sugerido' => 1],
            ['clave' => 'CCOS 004', 'nombre' => 'Programación I', 'creditos' => 6, 'semestre_sugerido' => 2],
            ['clave' => 'CCOS 010', 'nombre' => 'Programación II', 'creditos' => 6, 'semestre_sugerido' => 3],
            ['clave' => 'CCOS 005', 'nombre' => 'Ensamblador', 'creditos' => 6, 'semestre_sugerido' => 3],
            ['clave' => 'CCOS 009', 'nombre' => 'Estructuras Discretas', 'creditos' => 6, 'semestre_sugerido' => 2],
            ['clave' => 'CCOS 012', 'nombre' => 'Lógica Matemática', 'creditos' => 6, 'semestre_sugerido' => 4],
            ['clave' => 'CCOS 014', 'nombre' => 'Lenguajes Formales y Autómatas', 'creditos' => 6, 'semestre_sugerido' => 4],
            ['clave' => 'CCOS 013', 'nombre' => 'Estructuras de Datos', 'creditos' => 6, 'semestre_sugerido' => 3],
            ['clave' => 'CCOS 011', 'nombre' => 'Circuitos Eléctricos', 'creditos' => 6, 'semestre_sugerido' => 4],

            // --- NIVEL FORMATIVO ---
            ['clave' => 'CCOS 250', 'nombre' => 'Circuitos Lógicos', 'creditos' => 6, 'semestre_sugerido' => 5],
            ['clave' => 'CCOS 251', 'nombre' => 'Probabilidad y Estadística', 'creditos' => 6, 'semestre_sugerido' => 5],
            ['clave' => 'CCOS 252', 'nombre' => 'Sistemas Operativos I', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'CCOS 253', 'nombre' => 'Programación Concurrente y Paralela', 'creditos' => 6, 'semestre_sugerido' => 7],
            ['clave' => 'CCOS 254', 'nombre' => 'Sistemas Operativos II', 'creditos' => 6, 'semestre_sugerido' => 7],
            ['clave' => 'CCOS 255', 'nombre' => 'Fundamentos de Lenguajes de Programación', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'CCOS 256', 'nombre' => 'Programación Distribuida', 'creditos' => 6, 'semestre_sugerido' => 8],
            ['clave' => 'CCOS 257', 'nombre' => 'Computabilidad', 'creditos' => 6, 'semestre_sugerido' => 7],
            ['clave' => 'CCOS 258', 'nombre' => 'Inteligencia Artificial', 'creditos' => 6, 'semestre_sugerido' => 8],
            ['clave' => 'CCOS 259', 'nombre' => 'Arquitectura Funcional de Computadoras', 'creditos' => 6, 'semestre_sugerido' => 7],
            ['clave' => 'CCOS 260', 'nombre' => 'Redes de Computadoras', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'CCOS 261', 'nombre' => 'Graficación', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'CCOS 262', 'nombre' => 'Bases de Datos', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'CCOS 263', 'nombre' => 'Seguridad en Redes', 'creditos' => 6, 'semestre_sugerido' => 7],
            ['clave' => 'CCOS 264', 'nombre' => 'Recuperación de la Información', 'creditos' => 6, 'semestre_sugerido' => 8],
            ['clave' => 'ISCO 200', 'nombre' => 'Ingeniería de Software', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'ISCO 201', 'nombre' => 'Análisis y Diseño de Algoritmos', 'creditos' => 6, 'semestre_sugerido' => 6],
            ['clave' => 'IDDS 001', 'nombre' => 'Administración de Proyectos', 'creditos' => 5, 'semestre_sugerido' => 7],
            ['clave' => 'IDDS 002', 'nombre' => 'Proyectos I+D I', 'creditos' => 5, 'semestre_sugerido' => 8],
            ['clave' => 'SSCO 100', 'nombre' => 'Servicio Social', 'creditos' => 10, 'semestre_sugerido' => 8],
            ['clave' => 'PPCO 101', 'nombre' => 'Práctica Profesional', 'creditos' => 5, 'semestre_sugerido' => 9],

            // --- OPTATIVAS ---
            ['clave' => 'CCOS 700', 'nombre' => 'Aplicaciones WEB', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 600', 'nombre' => 'Web Semántica', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 610', 'nombre' => 'Aprendizaje Automático y Heurísticas', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 609', 'nombre' => 'Animación por Computadora', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 616', 'nombre' => 'Compiladores', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 604', 'nombre' => 'Criptografía', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 605', 'nombre' => 'Demostración Automática de Teoremas', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 614', 'nombre' => 'Estadística Avanzada', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 606', 'nombre' => 'Métodos Formales', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 613', 'nombre' => 'Programación de Dispositivos Móviles', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 603', 'nombre' => 'Redes Avanzadas', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'ICCS 257', 'nombre' => 'Minería de Datos', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 601', 'nombre' => 'Ingeniería de Software Avanzada', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 602', 'nombre' => 'Bases de Datos Avanzadas', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 607', 'nombre' => 'Interacción Humano Computadora', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 608', 'nombre' => 'Procesamiento Digital de Imágenes', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 611', 'nombre' => 'Big Data', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 612', 'nombre' => 'Bases de Datos Distribuidas', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 615', 'nombre' => 'Programación de Videojuegos', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 800', 'nombre' => 'Tópicos Selectos de la Computación I', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 801', 'nombre' => 'Tópicos Selectos de la Computación II', 'creditos' => 6, 'semestre_sugerido' => 9],
            ['clave' => 'CCOS 802', 'nombre' => 'Microprocesadores', 'creditos' => 6, 'semestre_sugerido' => 9],
        ];

        DB::table('materias')->insert($materias);
    }
}
