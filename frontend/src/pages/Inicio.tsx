import React, { useEffect, useState } from 'react';

// --- CONFIGURACIÓN DE IMÁGENES (Vatos estudiando) ---
// Usaremos URLs de Unsplash que son gratuitas y de alta calidad.
const imagenHero = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"; // Unos vatos colaborando con laptops
const imagenCaracteristicas = "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop"; // Un vato pensativo programando

const Inicio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  // Efecto para trackear el scroll (opcional, por si quieres más efectos después)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#0a0e17] text-white font-sans overflow-x-hidden">
      
      {/* 1. SECCIÓN HERO (La primera que se ve, con la imagen fija de fondo) */}
      <section 
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${imagenHero})` }}
      >
        {/* Capa de oscuridad para legibilidad */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-8">
          <div className="text-center flex flex-col items-center animate-fade-in">
            {/* Badge de Facultad - Ahora con color vibrante */}
            <div className="inline-flex items-center gap-2 bg-cyan-950/20 text-[#00f2fe] px-4 py-2 rounded-full border border-[#00f2fe]/50 mb-8 uppercase tracking-widest text-sm font-semibold">
              <span className="w-2 h-2 bg-[#00f2fe] rounded-full animate-pulse shadow-[0_0_10px_#00f2fe]"></span>
              Potenciado para FCC - BUAP
            </div>

            {/* Titular Principal - degradado neón */}
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.9] mb-8">
              Tu Kardex.<br />
              <span className="bg-gradient-to-r from-[#00f2fe] to-[#ff8c00] bg-clip-text text-transparent">Inteligencia Pura.</span>
            </h1>

            {/* Subtexto */}
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-12">
              Visualiza tu ruta crítica, simula promedios y predice tus semestres con tecnología avanzada. Diseñado por y para la FCC.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-[#00f2fe] text-black rounded-2xl font-extrabold text-xl hover:bg-[#00e0eb] transition-all hover:scale-105 shadow-[0_15px_30px_-5px_rgba(0,242,254,0.3)]">
                Empezar Análisis (PDF)
              </button>
              <button className="px-10 py-5 bg-white/5 backdrop-blur-sm text-white border border-white/10 rounded-2xl font-semibold text-xl hover:bg-white/10 transition-all">
                Ver Cómo Funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE INTRODUCCIÓN (Esta es la que 'cubre' a la Hero al subir) */}
      <section className="relative z-10 bg-white text-slate-900 py-32 md:py-48 px-8 rounded-t-[40px] md:rounded-t-[80px] -mt-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-[850] tracking-tight leading-none mb-10">Más que un historial, <br/>tu mapa al éxito.</h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-[900px] mx-auto">
            SSAAI transforma una lista aburrida de materias en un tablero de control estratégico. Sube tu PDF y deja que el sistema interprete tus datos y proyecte tu futuro.
          </p>
        </div>
      </section>

      {/* 3. SECCIÓN DE CARACTERÍSTICAS (Otra imagen fija de fondo) */}
      <section 
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${imagenCaracteristicas})` }}
      >
        <div className="absolute inset-0 bg-black/85 flex items-center justify-center px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full">
                <FeatureCard icon="📊" title="Visualización" desc="Gráficas claras y semáforos de materias para saber dónde estás." />
                <FeatureCard icon="🔮" title="Simulador" desc="¿Qué pasa si saco 10? Predice tu promedio en segundos." />
                <FeatureCard icon="🚀" title="Ruta Crítica" desc="Identifica materias clave que podrían retrasar tu graduación." />
            </div>
        </div>
      </section>

      {/* 4. SECCIÓN FINAL DE LLAMADA A LA ACCIÓN (Cierra con color y energía) */}
      <section className="relative z-10 bg-white text-slate-900 py-32 px-8 rounded-t-[40px] md:rounded-t-[80px] -mt-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-12">¿Listo para dominar tu carrera?</h2>
            <button className="px-12 py-6 bg-[#ff8c00] text-white rounded-2xl font-black text-2xl hover:bg-[#e67e00] transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(255,140,0,0.4)] uppercase tracking-widest">Subir mi Kardex Ahora — Gratis</button>
        </div>
      </section>

    </div>
  );
};

// Componente pequeño para las tarjetas de características (mantiene el código limpio)
interface FeatureCardProps {
    icon: string;
    title: string;
    desc: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
    <div className="bg-[#1e293b]/60 backdrop-blur-md p-10 rounded-[32px] border border-white/5 text-center shadow-2xl transition-all hover:border-[#00f2fe]/30 group">
        <div className="text-7xl mb-8 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default Inicio;