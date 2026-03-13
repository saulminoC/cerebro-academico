import React from 'react';
import { Link } from 'react-router-dom';

const Inicio: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      
      {/* --- HERO SECTION: DARK PREMIUM --- */}
      <section className="relative w-full h-[95vh] bg-[#020617] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Imagen fija con opacidad baja (Efecto elegante) */}
        <div 
          className="absolute inset-0 opacity-20 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')` }}
        />
        
        {/* Contenido Hero */}
        <div className="relative z-10 w-full max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-slate-800 bg-slate-900/50 rounded-full">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">SISTEMA DE ANÁLISIS ACADÉMICO</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[0.9] mb-8">
            Tu historial <br />
            <span className="text-slate-500">hecho estrategia.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            La herramienta de gestión curricular más avanzada para la FCC. 
            Optimiza tu promedio, visualiza seriaciones y proyecta tu graduación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-black rounded-lg font-bold text-sm hover:bg-slate-200 transition-all uppercase tracking-widest"
            >
              Comenzar análisis
            </Link>
            <Link 
              to="/funciones" 
              className="px-8 py-4 bg-transparent text-white border border-slate-800 rounded-lg font-bold text-sm hover:bg-white/5 transition-all uppercase tracking-widest"
            >
              Documentación
            </Link>
          </div>
        </div>

        {/* Indicador de scroll sutil */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent to-slate-700" />
      </section>

      {/* --- SECCIÓN 2: CLEAN CONTENT (Texto tapa imagen al subir) --- */}
      <section className="relative z-20 bg-white py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-slate-100 pt-12">
            
            <div className="md:col-span-4">
              <span className="text-cyan-600 font-bold text-sm tracking-tighter uppercase">Capacidades</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-4 leading-tight">Analítica de precisión para tu carrera.</h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-[1px] w-12 bg-slate-200" />
                <h3 className="font-bold text-slate-900 text-lg">Proyección Dinámica</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Calcula escenarios hipotéticos de promedios ponderados basados en tu histórico real de Autoservicios.</p>
              </div>
              <div className="space-y-4">
                <div className="h-[1px] w-12 bg-slate-200" />
                <h3 className="font-bold text-slate-900 text-lg">Mapa de Seriación</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Identifica materias críticas que bloquean tu avance y encuentra la ruta más corta al egreso.</p>
              </div>
              <div className="space-y-4">
                <div className="h-[1px] w-12 bg-slate-200" />
                <h3 className="font-bold text-slate-900 text-lg">Parser Inteligente</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Extracción de datos local y privada. Tu información nunca sale de tu navegador.</p>
              </div>
              <div className="space-y-4">
                <div className="h-[1px] w-12 bg-slate-200" />
                <h3 className="font-bold text-slate-900 text-lg">Reportes PDF</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Genera resúmenes ejecutivos de tu avance para trámites administrativos o tutorías.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: CTA FINAL --- */}
      <section className="bg-slate-50 py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">Toma el control de tu progreso hoy.</h2>
          <p className="text-slate-500 mb-10">Sin registros complicados, sin costos ocultos. Solo tu Kardex y SSAAI.</p>
          <button className="px-10 py-5 bg-black text-white rounded-full font-bold hover:bg-slate-800 transition-all">
            Empezar gratis
          </button>
        </div>
      </section>

    </div>
  );
};

export default Inicio;