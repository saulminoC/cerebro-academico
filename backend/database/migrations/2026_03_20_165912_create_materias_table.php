<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materias', function (Blueprint $table) {
            $table->id();
            $table->string('clave', 10)->unique(); // Ej: CCO-001
            $table->string('nombre');
            $table->integer('creditos');
            $table->integer('semestre_sugerido')->nullable();
            $table->timestamps();
        });

        // Tabla pivote para la SERIACIÓN (Qué materia bloquea a cuál)
        Schema::create('materia_requisitos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('materia_id')->constrained('materias')->onDelete('cascade');
            $table->foreignId('requisito_id')->constrained('materias')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materias');
    }
};
