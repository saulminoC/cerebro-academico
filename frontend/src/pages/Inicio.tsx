import React from 'react';
import { Link } from 'react-router-dom';

const Inicio: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* --- HERO: ARCHITECTURAL DESIGN --- */}
      <section className="relative h-[100vh] w-full flex items-center bg-[#020617] overflow-hidden">
        {/* Imagen de fondo con Parallax Sutil */}
        <div 
          className="absolute inset-0 z-0 opacity-25 bg-fixed bg-cover bg-center grayscale-[50%]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070')` }}
        />
        
        {/* Overlay de gradiente para dar profundidad */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

        <div className="relative z-20 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-3 py-1 mb-10 border border-slate-800 bg-slate-900/40 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Built for FCC BUAP</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-white tracking-[-0.05em] leading-[0.85] mb-10">
              Analítica <br />
              <span className="text-slate-500">académica integral.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-normal">
              SSAAI transforma tu historial en una ventaja estratégica. 
              Proyección de promedios, rutas críticas y gestión de seriación en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/login" 
                className="px-10 py-4 bg-white text-black rounded-sm font-bold text-sm hover:bg-cyan-400 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Analizar Kardex
              </Link>
              <Link 
                to="/funciones" 
                className="px-10 py-4 bg-transparent text-white border border-slate-700 rounded-sm font-bold text-sm hover:border-white transition-all duration-300 uppercase tracking-widest flex items-center justify-center"
              >
                Capacidades
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint vertical */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="flex flex-col items-center gap-4">
                <span className="[writing-mode:vertical-lr] text-[10px] text-slate-500 uppercase tracking-widest font-bold">Scroll to explore</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-slate-500 to-transparent" />
            </div>
        </div>
      </section>

      {/* --- SECTION 2: THE GRID (Swiss Style) --- */}
      <section className="relative z-30 bg-white py-32 px-6 md:px-12 rounded-t-[32px] -mt-8 shadow-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Header de la sección */}
            <div className="lg:col-span-4 sticky top-32 h-fit">
              <h2 className="text-sm font-black text-cyan-600 uppercase tracking-[0.2em] mb-6">Eficiencia</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Diseñado para la <br /> nueva era escolar.
              </h3>
            </div>

            {/* Grid de beneficios estilo minimalista */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              <Benefit 
                title="Integración de Datos" 
                desc="Extracción automática de información directamente desde tu PDF de Autoservicios sin comprometer tu privacidad."
              />
              <Benefit 
                title="Simulación Ponderada" 
                desc="Calcula con precisión milimétrica cómo cada materia impactará en tu promedio global antes de cargar materias."
              />
              <Benefit 
                title="Alertas de Seriación" 
                desc="Visualiza las dependencias entre materias para evitar cuellos de botella que retrasen tu graduación."
              />
              <Benefit 
                title="Exportación Pro" 
                desc="Genera reportes técnicos de tu avance académico listos para presentar en tutorías o procesos administrativos."
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA: MINIMALIST FINISH --- */}
      <section className="bg-slate-50 py-40 px-6 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 mb-10">Optimiza tu futuro.</h2>
          <p className="text-lg text-slate-500 mb-12 font-medium">Únete a los estudiantes de la FCC que ya están tomando decisiones basadas en datos reales.</p>
          <button className="group relative px-12 py-5 bg-black text-white text-sm font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:bg-slate-800">
            <span className="relative z-10">Empezar ahora</span>
          </button>
        </div>
      </section>

    </div>
  );
};

// Componente para los beneficios (Mantiene el código limpio)
const Benefit = ({ title, desc }: { title: string, desc: string }) => (
  <div className="group">
    <div className="h-[1px] w-full bg-slate-100 mb-8 transition-all group-hover:bg-cyan-500 duration-500" />
    <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h4>
    <p className="text-slate-500 leading-relaxed text-sm md:text-base">{desc}</p>
  </div>
);

export default Inicio;