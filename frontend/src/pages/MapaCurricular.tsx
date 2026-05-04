import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MapaCurricular: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapa, setMapa] = useState<Record<string, any[]>>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMapa = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('https://ssaai.saulmino.sbs/api-backend/public/api/mapa-curricular', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        const data = await res.json();
        if (res.ok) {
          setMapa(data);
        }
      } catch (e) {
        console.error("Error al cargar el mapa", e);
      } finally {
        setCargando(false);
      }
    };

    cargarMapa();
  }, []);

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const semestres = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Los 9 semestres de la carrera

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900 overflow-hidden">
      
      {/* SIDEBAR (Mismo del Dashboard) */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen z-50 w-[260px] bg-[#F9FAFB] border-r border-slate-200/60 flex flex-col py-8 px-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-10 px-3">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-slate-950 rounded-[8px] flex items-center justify-center transition-transform group-hover:-rotate-3">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-slate-900">SSAAI</span>
          </Link>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 mt-4">Panel Principal</p>
          <Link to="/dashboard" className="flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 transition-all">
            <BarChartIcon /> <span className="text-sm">Mi Avance</span>
          </Link>
          <Link to="/mapa-curricular" className="flex items-center gap-3.5 px-3 py-2.5 rounded-lg bg-white text-slate-900 font-bold shadow-sm border border-slate-200/60 transition-all">
            <MapIcon /> <span className="text-sm">Mapa Curricular</span>
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full ml-auto" />
          </Link>
        </nav>

        <div className="mt-auto pt-6 px-3">
          <Link to="/login" className="w-full py-2 text-slate-400 hover:text-slate-900 rounded-lg font-bold text-[11px] uppercase tracking-wider text-center block transition-colors" onClick={() => localStorage.clear()}>
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-white md:rounded-tl-[32px] md:border-l md:border-t border-slate-200/60 md:shadow-[-10px_0_30px_rgb(0,0,0,0.02)] md:my-2 md:mr-2">
        <div className="p-6 md:p-12">
          
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Mapa Curricular</h1>
            <p className="text-slate-500 text-sm mt-1">Visualiza tu progreso en el plan de estudios Minerva 2016.</p>
          </header>

          {cargando ? (
            <p className="text-slate-500 font-bold animate-pulse">Cargando mapa...</p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
              {semestres.map((semestre) => (
                <div key={semestre} className="min-w-[280px] w-[280px] shrink-0 snap-start">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-bold text-slate-900">Semestre {semestre}</h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {mapa[semestre]?.length || 0} Materias
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {mapa[semestre]?.map((materia) => (
                      <div 
                        key={materia.id} 
                        className={`p-4 rounded-xl border transition-all ${
                          materia.estado === 'aprobada' 
                            ? 'bg-emerald-50 border-emerald-200 shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${materia.estado === 'aprobada' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {materia.clave}
                          </span>
                          {materia.estado === 'aprobada' && (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                        <h4 className={`text-sm font-bold leading-tight ${materia.estado === 'aprobada' ? 'text-emerald-900' : 'text-slate-700'}`}>
                          {materia.nombre}
                        </h4>
                        <p className={`text-xs mt-3 font-semibold ${materia.estado === 'aprobada' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {materia.creditos} Créditos
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// ICONOS SVG
const BarChartIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const MapIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>);
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);

export default MapaCurricular;