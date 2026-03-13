# SSAAI — Sistema de Seguimiento Académico con Inteligencia Artificial

> Transforma tu kardex en un tablero de control estratégico. Diseñado para estudiantes de la **Facultad de Ciencias de la Computación · BUAP**.

---

## ¿Qué es SSAAI?

SSAAI es una aplicación web que permite a los estudiantes de la FCC-BUAP subir su kardex en PDF y obtener al instante:

- 📊 **Visualización** de materias aprobadas, reprobadas y en curso
- 🔮 **Simulador de promedio** — proyecta escenarios futuros
- 🚀 **Ruta crítica** — detecta materias que pueden retrasar tu graduación

Sin registro. Sin almacenamiento de datos. Solo sube tu PDF y listo.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript |
| Backend | Laravel 11 (PHP) |
| Estilos | Tailwind CSS |
| Build | Vite |

---

## Instalación

### Requisitos previos

- Node.js >= 18
- PHP >= 8.2
- Composer >= 2.x
- Git

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/saulminoC/ssaai.git
cd ssaai
```

---

### 2. Backend (Laravel)

```bash
# Entrar al directorio backend
cd backend

# Instalar dependencias PHP
composer install

# Copiar variables de entorno
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Correr migraciones
php artisan migrate

# Iniciar servidor de desarrollo
php artisan serve
```

El servidor estará disponible en `http://localhost:8000`.

---

### 3. Frontend (React + TypeScript)

```bash
# Desde la raíz del proyecto
cd frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

---

### 4. Variables de entorno

**Frontend — `.env.local`**
```env
VITE_API_URL=http://localhost:8000/api
```

**Backend — `.env`**
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

---

## Autor

Desarrollado por **[@saulminoC](https://github.com/saulminoC)**  
Facultad de Ciencias de la Computación · BUAP

---

<p align="center">Hecho con 🧠 y mucho café desde Puebla, México</p>