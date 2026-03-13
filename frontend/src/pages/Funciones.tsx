import React from 'react';

const Funciones: React.FC = () => {
  return (
    <div className="w-full bg-white font-sans text-slate-900">
      
      {/* --- HERO: FUNCIONES (Dark & Technical) --- */}
      <section className="relative h-[60vh] w-full flex items-center bg-[#020617] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-fixed bg-cover bg-center grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bbdac8626ad1?q=80&w=2070')` }}
        />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4 block">Core Engine</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-[-0.05em] leading-[0.85] mb-6">
              Capacidades <br />
              <span className="text-slate-500">del sistema.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: DETALLE TÉCNICO --- */}
      <section className="relative z-20 bg-white py-32 px-6 md:px-12 rounded-t-[32px] -mt-8">
        <div className="container mx-auto">
          
          {/* Función 1: El Parser */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div>
              <span className="text-cyan-600 font-black text-xs uppercase tracking-widest">Modulo 01</span>
              <h2 className="text-4xl font-bold mt-4 mb-6 tracking-tight">Extracción Inteligente de Datos</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Nuestro motor de procesamiento lee el PDF nativo de Autoservicios BUAP, identificando automáticamente claves de materia, periodos, créditos y calificaciones sin errores de transcripción.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> 
                  Soporte total para el modelo Minerva y planes actuales.
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> 
                  Privacidad local: Los datos no suben a ningún servidor.
                </li>
              </ul>
            </div>
            {/* Representación visual del Parser */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner">
              <div className="w-full h-64 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-slate-100 rounded" />
                  <div className="h-2 w-1/2 bg-slate-100 rounded" />
                  <div className="h-2 w-5/6 bg-cyan-50 rounded" />
                </div>
                <div className="flex justify-between items-end">
                   <div className="h-20 w-20 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">PDF</div>
                   <div className="animate-pulse text-cyan-500 text-2xl">→</div>
                   <div className="h-24 w-32 bg-slate-900 rounded-lg flex flex-col p-3 gap-2">
                      <div className="h-1 w-full bg-slate-700 rounded" />
                      <div className="h-1 w-full bg-slate-700 rounded" />
                      <div className="h-1 w-3/4 bg-cyan-500 rounded" />
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Función 2: El Simulador */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="order-2 lg:order-1 bg-slate-950 rounded-3xl p-10 text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
               <div className="relative z-10">
                  <div className="text-4xl font-bold mb-2">8.75</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest mb-8">Promedio Proyectado</div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                        <span>Probabilidad I</span>
                        <span className="text-cyan-400 font-bold">10.0</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                        <span>Ingeniería de Software</span>
                        <span className="text-cyan-400 font-bold">9.0</span>
                    </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-cyan-600 font-black text-xs uppercase tracking-widest">Modulo 02</span>
              <h2 className="text-4xl font-bold mt-4 mb-6 tracking-tight">Simulador de Escenarios</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Calcula tu promedio ponderado antes de que termine el semestre. Ingresa tus calificaciones probables y visualiza instantáneamente cómo impactarán en tu estatus académico global.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Cálculo Real</h4>
                  <p className="text-slate-500 text-xs text-pretty">Basado en el sistema de créditos oficial de la FCC.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Metas</h4>
                  <p className="text-slate-500 text-xs text-pretty">Define un promedio objetivo y el sistema te dirá qué necesitas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Función 3: Seriación */}
          <div className="w-full bg-slate-50 rounded-[40px] p-12 lg:p-20 flex flex-col items-center text-center">
             <span className="text-cyan-600 font-black text-xs uppercase tracking-widest mb-6">Modulo 03</span>
             <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Mapa de Dependencias</h2>
             <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mb-12">
               Visualiza de forma gráfica las materias que bloquean tu avance. Identifica la "ruta crítica" para evitar semestres con carga mínima y optimizar tu tiempo de egreso.
             </p>
             <div className="w-full max-w-4xl h-1 bg-slate-200 relative mb-20">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white shadow-sm" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-slate-300 rounded-full border-4 border-white shadow-sm" />
             </div>
          </div>

        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-32 px-6 text-center border-t border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">¿Listo para probar la potencia del sistema?</h2>
        <button className="px-10 py-4 bg-black text-white rounded-sm font-bold text-sm hover:bg-slate-800 transition-all uppercase tracking-widest">
          Subir mi primer PDF
        </button>
      </section>
    </div>
  );
};

export default Funciones;