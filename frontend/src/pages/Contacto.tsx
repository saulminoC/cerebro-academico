import React from 'react';

const Contacto: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- HERO: CONTACTO (Fondo Fijo) --- */}
      <section className="relative h-[50vh] w-full flex items-center bg-[#020617] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-fixed bg-cover bg-center grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070')` }}
        />
        
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4 block">Soporte y Colaboración</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-[-0.05em] leading-[0.85] mb-6">
              Estamos en <br />
              <span className="text-slate-500">contacto.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: FORMULARIO Y DATOS (Cubre al Hero) --- */}
      <section className="relative z-20 bg-white py-24 px-6 md:px-12 rounded-t-[32px] -mt-8 shadow-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Columna Izquierda: Info Directa */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-sm font-black text-cyan-600 uppercase tracking-[0.2em] mb-6">Ubicación</h2>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Facultad de Ciencias de la Computación, BUAP.<br />
                  Edificio de Posgrado, Planta Alta.<br />
                  Puebla, México.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-black text-cyan-600 uppercase tracking-[0.2em] mb-6">Canales Directos</h2>
                <div className="space-y-4">
                  <div className="group flex items-center gap-4 cursor-pointer">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                      <span className="text-slate-400 group-hover:text-cyan-600">✉</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 border-b border-transparent group-hover:border-cyan-500 transition-all">soporte.sssai@buap.mx</span>
                  </div>
                  <div className="group flex items-center gap-4 cursor-pointer">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                      <span className="text-slate-400 group-hover:text-cyan-600">𝕏</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 border-b border-transparent group-hover:border-cyan-500 transition-all">@SSAAI_FCC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario Minimalista */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre Completo</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors font-medium text-slate-900" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Matrícula (Opcional)</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors font-medium text-slate-900" placeholder="202XXXXXX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asunto</label>
                    <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors font-medium text-slate-900 appearance-none">
                      <option>Soporte Técnico</option>
                      <option>Reportar Bug</option>
                      <option>Sugerencia de Función</option>
                      <option>Colaboración / Proyecto</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensaje</label>
                    <textarea rows={5} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors font-medium text-slate-900 resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 bg-slate-950 text-white font-black uppercase tracking-[0.2em] text-xs rounded-lg hover:bg-cyan-600 transition-all duration-300">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER SUTIL --- */}
      <footer className="py-20 text-center border-t border-slate-100">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 SSAAI — Built for the future of FCC BUAP
        </p>
      </footer>
    </div>
  );
};

export default Contacto;