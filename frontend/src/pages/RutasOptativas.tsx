import React from 'react';
import { Link } from 'react-router-dom';

const RutasOptativas: React.FC = () => {
  // Datos extraídos REALES del PDF de la FCC (Plan 2016)
  const rutas = [
    {
      id: 'software',
      titulo: 'Ingeniería de Software',
      descripcion: 'Especialízate en metodologías, diseño de interfaces y desarrollo a gran escala.',
      color: 'bg-indigo-500',
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-100',
      textDark: 'text-indigo-700',
      materias: [
        { nombre: 'Tópicos Selectos de Computación I', creditos: 6 },
        { nombre: 'Ingeniería de Software Avanzada', creditos: 6 },
        { nombre: 'Interacción Humano Computadora', creditos: 6 }
      ]
    },
    {
      id: 'datos',
      titulo: 'Bases de Datos & Big Data',
      descripcion: 'Domina la extracción, análisis y distribución de grandes volúmenes de información.',
      color: 'bg-cyan-500',
      bgLight: 'bg-cyan-50',
      borderLight: 'border-cyan-100',
      textDark: 'text-cyan-700',
      materias: [
        { nombre: 'Minería de Datos', creditos: 6 },
        { nombre: 'Web Semántica', creditos: 6 },
        { nombre: 'Bases de Datos Avanzadas', creditos: 6 },
        { nombre: 'Big Data', creditos: 6 },
        { nombre: 'Bases de Datos Distribuidas', creditos: 6 }
      ]
    },
    {
      id: 'graficacion',
      titulo: 'Graficación y Videojuegos',
      descripcion: 'Creación de entornos visuales, animación digital y procesamiento de imágenes.',
      color: 'bg-fuchsia-500',
      bgLight: 'bg-fuchsia-50',
      borderLight: 'border-fuchsia-100',
      textDark: 'text-fuchsia-700',
      materias: [
        { nombre: 'Programación de Videojuegos', creditos: 6 },
        { nombre: 'Procesamiento Digital de Imágenes', creditos: 6 },
        { nombre: 'Animación por Computadora', creditos: 6 }
      ]
    },
    {
      id: 'redes',
      titulo: 'Redes y Ciberseguridad',
      descripcion: 'Protección de datos, criptografía y administración de redes avanzadas.',
      color: 'bg-emerald-500',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-100',
      textDark: 'text-emerald-700',
      materias: [
        { nombre: 'Redes Avanzadas', creditos: 6 },
        { nombre: 'Criptografía', creditos: 6 }
      ]
    },
    {
      id: 'ia',
      titulo: 'Inteligencia Artificial',
      descripcion: 'Sistemas inteligentes, heurísticas y aprendizaje automático.',
      color: 'bg-amber-500',
      bgLight: 'bg-amber-50',
      borderLight: 'border-amber-100',
      textDark: 'text-amber-700',
      materias: [
        { nombre: 'Aprendizaje Automático y Heurísticas', creditos: 6 }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900 overflow-hidden selection:bg-cyan-100">
      
      {/* --- SIDEBAR MINIMALISTA --- */}
      <aside className="w-[260px] bg-[#F9FAFB] border-r border-slate-200/60 flex flex-col py-8 px-4 sticky top-0 h-screen shrink-0">
        <Link to="/" className="flex items-center gap-3 mb-10 px-3 group">
          <div className="w-8 h-8 bg-slate-950 rounded-[8px] flex items-center justify-center transition-transform group-hover:-rotate-3">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">SSAAI</span>
        </Link>

        <nav className="space-y-1 flex-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 mt-4">Panel Principal</p>
          <SidebarLink title="Mi Avance" icon={<BarChartIcon />} to="/dashboard" />
          <SidebarLink title="Análisis de Kardex" icon={<DocumentIcon />} to="/dashboard" />
          <SidebarLink title="Mapa Curricular" icon={<MapIcon />} to="/mapa-curricular" />
          
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 mt-8">Planificación</p>
          <SidebarLink title="Rutas Optativas" icon={<TargetIcon />} to="/rutas-optativas" />
          <SidebarLink title="Tutorías Académicas" icon={<UsersIcon />} to="#" />
        </nav>

        <div className="mt-auto pt-6 px-3">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-slate-200/60 shadow-sm hover:shadow-md hover:shadow-slate-200/20">
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">John Doe</p>
              <p className="text-[11px] text-slate-500 font-medium truncate">2021XXXXX</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto bg-white rounded-tl-[32px] border-l border-t border-slate-200/60 shadow-[-10px_0_30px_rgb(0,0,0,0.02)] my-2 mr-2">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="mb-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plan Minerva 2016</p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Especializaciones y Rutas</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explora las líneas de conocimiento de la facultad. Al elegir una ruta, el Cerebro Académico priorizará estas materias en tus sugerencias semestrales considerando tus créditos actuales.
            </p>
          </header>

          {/* GRID DE RUTAS (Estilo Bento Múltiple) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rutas.map((ruta) => (
              <div key={ruta.id} className="flex flex-col bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Cabecera de la Tarjeta */}
                <div className={`${ruta.bgLight} ${ruta.borderLight} border-b p-6 relative overflow-hidden`}>
                  <div className={`absolute -right-4 -top-4 w-24 h-24 ${ruta.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <div className="relative z-10">
                    <h3 className={`text-xl font-bold tracking-tight ${ruta.textDark} mb-2`}>{ruta.titulo}</h3>
                    <p className={`text-xs ${ruta.textDark} opacity-80 leading-relaxed min-h-[40px]`}>{ruta.descripcion}</p>
                  </div>
                </div>

                {/* Lista de Materias (Cuerpo) */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Materias de la ruta</p>
                  <ul className="space-y-3 flex-1 mb-6">
                    {ruta.materias.map((materia, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full ${ruta.color} shrink-0`} />
                        <div>
                          <p className="text-sm font-bold text-slate-700 leading-snug">{materia.nombre}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{materia.creditos} Créditos</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Botón de Acción */}
                  <button className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${ruta.borderLight} ${ruta.textDark} hover:${ruta.color} hover:text-white bg-white`}>
                    Seleccionar Ruta
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES AUXILIARES (Iconos SVG) ---
const SidebarLink = ({ title, icon, active, to }: { title: string; icon: React.ReactNode; active?: boolean, to: string }) => (
  <Link to={to} className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-200 ${active ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200/60' : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 border border-transparent'}`}>
    <div className={`${active ? 'text-slate-900' : 'text-slate-400'}`}>{icon}</div>
    <span className="text-sm">{title}</span>
    {active && <div className="w-1.5 h-1.5 bg-slate-900 rounded-full ml-auto" />}
  </Link>
);

const BarChartIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const DocumentIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>);
const MapIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>);
const TargetIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const UsersIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);

export default RutasOptativas;