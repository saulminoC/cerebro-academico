import React from 'react';

const Nosotros: React.FC = () => {
  return (
    <div className="w-full bg-white">
      
      {/* --- HERO: NOSOTROS (Fixed Background) --- */}
      <section className="relative h-[70vh] w-full flex items-center bg-[#020617] overflow-hidden">
        {/* Imagen de fondo de alta calidad (vatos enfocados) */}
        <div 
          className="absolute inset-0 z-0 opacity-30 bg-fixed bg-cover bg-center grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')` }}
        />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-[-0.05em] leading-[0.85] mb-6">
              Ingeniería <br />
              <span className="text-slate-500">con propósito.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl font-normal leading-relaxed">
              Un proyecto nacido en el corazón de la FCC para resolver 
              los desafíos de la gestión académica moderna.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: LA VISIÓN (Cubre a la anterior) --- */}
      <section className="relative z-20 bg-white py-32 px-6 md:px-12 rounded-t-[32px] -mt-8 shadow-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-5">
              <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.3em] mb-4 block">Génesis</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                De alumnos, <br /> para alumnos.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <p className="text-xl text-slate-600 leading-relaxed">
                SSAAI nació como respuesta a la complejidad de interpretar el historial académico. Entendemos que un Kardex es más que una lista de calificaciones; es el mapa de tu futuro profesional.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Nuestra misión es democratizar el acceso a la analítica de datos personales, permitiendo que cada estudiante de la Facultad de Ciencias de la Computación tome decisiones informadas sobre su trayectoria.
              </p>
            </div>
          </div>

          {/* Línea divisoria minimalista */}
          <div className="w-full h-[1px] bg-slate-100 my-24" />

          {/* --- GRID DE VALORES (Bento Box sutil) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueBox 
              title="Privacidad" 
              desc="Tu información es tuya. El procesamiento se realiza de forma local, asegurando que tus datos nunca se almacenen sin tu permiso."
            />
            <ValueBox 
              title="Precisión" 
              desc="Algoritmos diseñados específicamente para el modelo educativo de la BUAP, garantizando cálculos exactos de promedios."
            />
            <ValueBox 
              title="Innovación" 
              desc="Buscamos constantemente nuevas formas de visualizar la información académica para hacerla digerible y útil."
            />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: TEAM / FOOTER-LIKE --- */}
      <section className="bg-slate-50 py-32 px-6 border-t border-slate-100">
        <div className="container mx-auto text-center">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Desarrollado en la FCC — BUAP</h2>
            <div className="flex justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Aquí podrías poner logos o iconos minimalistas de tecnología */}
                <span className="font-bold text-2xl text-slate-800 tracking-tighter italic">React</span>
                <span className="font-bold text-2xl text-slate-800 tracking-tighter italic">TypeScript</span>
                <span className="font-bold text-2xl text-slate-800 tracking-tighter italic">Tailwind</span>
            </div>
        </div>
      </section>
    </div>
  );
};

// Componente para los valores
const ValueBox = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-8 border border-slate-100 rounded-2xl hover:border-cyan-500/30 transition-colors duration-500">
    <h4 className="text-lg font-bold text-slate-950 mb-4 tracking-tight uppercase tracking-[0.1em]">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Nosotros;