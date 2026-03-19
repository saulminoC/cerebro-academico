import React from 'react';
import { Link } from 'react-router-dom';

const MapaCurricular: React.FC = () => {
  // Datos simulados estructurados por semestre
  const reticula = [
    {
      semestre: 'Semestre 1',
      materias: [
        { clave: 'CCO-001', nombre: 'Programación I', creditos: 6, estado: 'aprobada' },
        { clave: 'MAT-001', nombre: 'Cálculo Diferencial', creditos: 5, estado: 'aprobada' },
        { clave: 'MAT-002', nombre: 'Matemáticas Discretas', creditos: 5, estado: 'aprobada' },
        { clave: 'FGS-001', nombre: 'Formación Humana Social', creditos: 4, estado: 'aprobada' },
      ]
    },
    {
      semestre: 'Semestre 2',
      materias: [
        { clave: 'CCO-002', nombre: 'Programación II', creditos: 6, estado: 'aprobada' },
        { clave: 'MAT-003', nombre: 'Cálculo Integral', creditos: 5, estado: 'aprobada' },
        { clave: 'MAT-004', nombre: 'Álgebra Lineal', creditos: 5, estado: 'aprobada' },
        { clave: 'CCO-003', nombre: 'Estructuras de Datos', creditos: 6, estado: 'cursando' },
      ]
    },
    {
      semestre: 'Semestre 3',
      materias: [
        { clave: 'CCO-004', nombre: 'Sistemas Operativos I', creditos: 6, estado: 'cursando' },
        { clave: 'CCO-005', nombre: 'Bases de Datos I', creditos: 6, estado: 'cursando' },
        { clave: 'MAT-005', nombre: 'Probabilidad y Estadística', creditos: 5, estado: 'pendiente' },
        { clave: 'CCO-006', nombre: 'Ingeniería de Software I', creditos: 6, estado: 'pendiente' },
      ]
    },
    {
      semestre: 'Semestre 4',
      materias: [
        { clave: 'CCO-007', nombre: 'Redes de Computadoras', creditos: 6, estado: 'bloqueada' },
        { clave: 'CCO-008', nombre: 'Sistemas Operativos II', creditos: 6, estado: 'bloqueada' },
        { clave: 'CCO-009', nombre: 'Bases de Datos II', creditos: 6, estado: 'bloqueada' },
        { clave: 'OPT-001', nombre: 'Optativa Formativa', creditos: 4, estado: 'pendiente' },
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900 overflow-hidden selection:bg-cyan-100">
      
      {/* --- SIDEBAR MINIMALISTA (Idéntico al Dashboard) --- */}
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
          <SidebarLink title="Mapa Curricular" icon={<MapIcon />} active to="/mapa-curricular" />
          
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
          <Link to="/login" className="w-full py-2 text-slate-400 hover:text-slate-900 rounded-lg font-bold text-[11px] uppercase tracking-wider text-center block transition-colors">
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto bg-white rounded-tl-[32px] border-l border-t border-slate-200/60 shadow-[-10px_0_30px_rgb(0,0,0,0.02)] my-2 mr-2 flex flex-col">
        <div className="p-8 md:p-12 pb-6 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <header className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plan Minerva - FCC</p>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mapa Curricular</h1>
            </div>
            
            {/* Leyenda de Estados */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg p-1.5">
              <LegendItem color="bg-emerald-500" label="Aprobada" />
              <LegendItem color="bg-cyan-500" label="En Curso" />
              <LegendItem color="bg-slate-300" label="Pendiente" />
              <LegendItem color="bg-red-400" label="Bloqueada" lock />
            </div>
          </header>
        </div>

        {/* CONTENEDOR DE LA RETÍCULA (Scroll Horizontal Fino) */}
        <div className="px-8 md:px-12 flex-1 overflow-x-auto pb-12 custom-scrollbar">
          <div className="flex gap-6 min-w-max pb-4">
            
            {/* Iterar sobre semestres */}
            {reticula.map((sem, index) => (
              <div key={index} className="w-[280px] flex flex-col">
                {/* Header de la columna */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{sem.semestre}</h3>
                  <span className="text-[10px] font-bold text-slate-400">{sem.materias.length} MATERIAS</span>
                </div>
                
                {/* Materias del semestre */}
                <div className="space-y-3">
                  {sem.materias.map((materia, idx) => (
                    <MateriaCard key={idx} {...materia} />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Placeholder para próximos semestres */}
            <div className="w-[280px] flex flex-col opacity-50">
               <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Semestre 5</h3>
                  <span className="text-[10px] font-bold text-slate-300">BLOQUEADO</span>
                </div>
                <div className="h-24 border border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                   <LockIcon className="text-slate-300 w-5 h-5" />
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES DE INTERFAZ ---

const LegendItem = ({ color, label, lock }: { color: string, label: string, lock?: boolean }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-default">
    <div className={`w-2.5 h-2.5 rounded-sm ${color} flex items-center justify-center`}>
       {lock && <LockIcon className="w-2 h-2 text-white" />}
    </div>
    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{label}</span>
  </div>
);

// Tarjeta de Materia (El estilo cambia según el estado)
const MateriaCard = ({ clave, nombre, creditos, estado }: any) => {
  let styleClasses = "";
  let icon = null;

  switch (estado) {
    case 'aprobada':
      styleClasses = "bg-white border-emerald-200 shadow-[0_2px_10px_rgb(16,185,129,0.05)] hover:border-emerald-300";
      icon = <CheckCircleIcon className="text-emerald-500 w-4 h-4" />;
      break;
    case 'cursando':
      styleClasses = "bg-white border-cyan-300 shadow-[0_2px_10px_rgb(6,182,212,0.1)] ring-1 ring-cyan-100 hover:border-cyan-400";
      icon = <PlayCircleIcon className="text-cyan-500 w-4 h-4" />;
      break;
    case 'pendiente':
      styleClasses = "bg-white border-slate-200 shadow-sm hover:border-slate-300";
      icon = <CircleIcon className="text-slate-300 w-4 h-4" />;
      break;
    case 'bloqueada':
      styleClasses = "bg-slate-50 border-slate-100 opacity-75 grayscale-[0.5]";
      icon = <LockIcon className="text-slate-400 w-3.5 h-3.5" />;
      break;
  }

  return (
    <div className={`p-4 rounded-xl border transition-all cursor-pointer group ${styleClasses}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-black uppercase tracking-widest ${estado === 'aprobada' ? 'text-emerald-600' : estado === 'cursando' ? 'text-cyan-600' : 'text-slate-400'}`}>
          {clave}
        </span>
        {icon}
      </div>
      <h4 className="text-sm font-bold text-slate-900 leading-snug mb-3 group-hover:text-slate-700">{nombre}</h4>
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-slate-500">{creditos} CRÉDITOS</span>
        {estado === 'bloqueada' && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Seriación</span>}
      </div>
    </div>
  );
};

// Enlace del Sidebar
const SidebarLink = ({ title, icon, active, to }: { title: string; icon: React.ReactNode; active?: boolean, to: string }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200/60' 
        : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 border border-transparent'
    }`}
  >
    <div className={`${active ? 'text-slate-900' : 'text-slate-400'}`}>{icon}</div>
    <span className="text-sm">{title}</span>
    {active && <div className="w-1.5 h-1.5 bg-slate-900 rounded-full ml-auto" />}
  </Link>
);

// --- ICONOS VECTORIALES (SVGs limpios, cero emojis) ---
const BarChartIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const DocumentIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>);
const MapIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>);
const TargetIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const UsersIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);

// Iconos de Estado para las materias
const CheckCircleIcon = ({ className }: { className: string }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const PlayCircleIcon = ({ className }: { className: string }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>);
const CircleIcon = ({ className }: { className: string }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>);
const LockIcon = ({ className }: { className: string }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);

export default MapaCurricular;