import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- MINI COMPONENTE INTELIGENTE (ESTILO MINIMALISTA) ---
const SidebarLink = ({ title, icon, to }: { title: string, icon: React.ReactNode, to?: string }) => {
  const location = useLocation();
  const active = to ? location.pathname === to : false;

  const baseClass = "flex items-center justify-between px-4 py-2 rounded-xl font-medium transition-all duration-200 mb-1";
  const activeClass = "bg-white text-slate-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/80";
  const inactiveClass = "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50";

  const content = (
    <>
      <div className="flex items-center gap-3">
        <div className={`w-[18px] h-[18px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center ${active ? 'text-slate-900' : 'text-slate-400'}`}>
          {icon}
        </div>
        <span className={`text-[13px] ${active ? 'font-bold' : 'font-medium'}`}>{title}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]"></div>}
    </>
  );

  return to ? (
    <Link to={to} className={`block ${baseClass} ${active ? activeClass : inactiveClass}`}>
      {content}
    </Link>
  ) : (
    <div className={`block cursor-pointer opacity-70 ${baseClass} ${inactiveClass}`} title="Próximamente">
      {content}
    </div>
  );
};

// --- INTERFAZ DE LAS PROPIEDADES ---
interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  usuario: { nombre?: string; apellidos?: string; matricula?: string | number };
}

// --- EL COMPONENTE PRINCIPAL ---
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, usuario }) => {
  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-50 w-[240px] bg-[#F9FAFB] border-r border-slate-200/60 
        flex flex-col py-8 px-4 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-10 px-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-slate-950 rounded-[8px] flex items-center justify-center transition-transform group-hover:-rotate-3">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-slate-900">SSAAI</span>
          </Link>
          <button className="md:hidden text-slate-400 hover:text-slate-900" onClick={() => setIsSidebarOpen(false)}>
            <span className="text-xl font-bold">✕</span> 
          </button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400/80 mb-3 mt-2">Panel Principal</p>
          
          <SidebarLink 
            title="Mi Avance" 
            to="/dashboard"
            icon={<svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>} 
          />
          <SidebarLink 
            title="Análisis de Kardex" 
            to="/analisis-kardex"
            icon={<svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} 
          />
          <SidebarLink 
            title="Mapa Curricular" 
            to="/mapa-curricular" 
            icon={<svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>} 
          />
          
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400/80 mb-3 mt-8">Planificación</p>
          
          <SidebarLink 
            title="Rutas Optativas" 
            to="/rutas-optativas" 
            icon={<svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>} 
          />
          <SidebarLink 
            title="Tutorías Académicas" 
            icon={<svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} 
          />
        </nav>

        <div className="mt-auto pt-6 px-2">
          <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl bg-white/60 border border-slate-200/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
              {usuario.nombre ? usuario.nombre.substring(0,2).toUpperCase() : 'AL'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[14px] font-bold text-slate-900 truncate">{usuario.nombre || 'Alumno FCC'}</p>
              <p className="text-[12px] text-slate-500 font-medium truncate mt-0.5">{usuario.matricula || '202047334'}</p>
            </div>
          </div>
          <Link to="/login" className="w-full py-2 text-slate-400/80 hover:text-slate-800 rounded-lg font-bold text-[11px] uppercase tracking-wider text-center block transition-colors" onClick={() => localStorage.clear()}>
            Cerrar Sesión
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;