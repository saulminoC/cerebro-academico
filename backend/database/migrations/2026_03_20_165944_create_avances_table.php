<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Esta tabla guarda el historial de cada alumno
        Schema::create('avances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('materia_id')->constrained('materias')->onDelete('cascade');
            $table->enum('estado', ['aprobada', 'cursando', 'reprobada']);
            $table->decimal('calificacion', 4, 2)->nullable(); // Ej: 8.50
            $table->string('periodo_aprobacion', 20)->nullable(); // Ej: Otoño 2023
            $table->timestamps();

            // Evitar que un alumno tenga la misma materia registrada dos veces en su avance
            $table->unique(['user_id', 'materia_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avances');
    }
};
