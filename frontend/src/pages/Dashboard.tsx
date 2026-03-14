import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const materiasSugeridas = [
    { clave: 'IACC 001', nombre: 'Inteligencia Artificial I', tipo: 'Optativa', ruta: 'IA' },
    { clave: 'CCYT 005', nombre: 'Criptografía Aplicada', tipo: 'Optativa', ruta: 'Seguridad' },
    { clave: 'DESW 003', nombre: 'Desarrollo Web Fullstack', tipo: 'Optativa', ruta: 'Desarrollo' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900 overflow-hidden selection:bg-cyan-100">
      
      {/* --- SIDEBAR MINIMALISTA --- */}
      <aside className="w-[260px] bg-[#F9FAFB] border-r border-slate-200/60 flex flex-col py-8 px-4 sticky top-0 h-screen">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-10 px-3 group">
          <div className="w-8 h-8 bg-slate-950 rounded-[8px] flex items-center justify-center transition-transform group-hover:-rotate-3">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">SSAAI</span>
        </Link>

        {/* Navegación Principal */}
        <nav className="space-y-1 flex-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 mt-4">Panel Principal</p>
          <SidebarLink title="Mi Avance" icon={<BarChartIcon />} active />
          <SidebarLink title="Análisis de Kardex" icon={<DocumentIcon />} />
          <SidebarLink title="Mapa Curricular" icon={<MapIcon />} />
          
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 mt-8">Planificación</p>
          <SidebarLink title="Rutas Optativas" icon={<TargetIcon />} />
          <SidebarLink title="Tutorías Académicas" icon={<UsersIcon />} />
        </nav>

        {/* Perfil Inferior */}
        <div className="mt-auto pt-6 px-3">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-slate-200/60 shadow-sm hover:shadow-md hover:shadow-slate-200/20">
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Saúl Mino Cabrera</p>
              <p className="text-[11px] text-slate-500 font-medium truncate">2021XXXXX</p>
            </div>
          </div>
          <Link to="/login" className="w-full py-2 text-slate-400 hover:text-slate-900 rounded-lg font-bold text-[11px] uppercase tracking-wider text-center block transition-colors">
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto bg-white rounded-tl-[32px] border-l border-t border-slate-200/60 shadow-[-10px_0_30px_rgb(0,0,0,0.02)] my-2 mr-2">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Estado: Regular</p>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resumen Académico</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar clave o materia..." 
                  className="bg-slate-50 border border-slate-200 rounded-full pl-10 pr-5 py-2.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all font-medium placeholder:text-slate-400" 
                />
              </div>
              <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors relative">
                <BellIcon />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </header>

          {/* GRID DE ESTADÍSTICAS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Card 1: Promedio */}
            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Promedio Ponderado</p>
                <div className="p-2 bg-slate-50 rounded-lg"><TrendingUpIcon /></div>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-5xl font-bold tracking-tighter text-slate-900 leading-none">8.92</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-1">+0.15 este periodo</span>
              </div>
            </div>

            {/* Card 2: Créditos */}
            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avance de Créditos</p>
                <div className="p-2 bg-slate-50 rounded-lg"><PieChartIcon /></div>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <h3 className="text-4xl font-bold tracking-tighter text-slate-900 leading-none">180</h3>
                <span className="text-sm font-semibold text-slate-400">/ 250</span>
              </div>
              {/* Progress Bar Fina */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 rounded-full w-[72%]" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 text-right">72% Completado</p>
            </div>

            {/* Card 3: Estatus */}
            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Plan de Estudios</p>
                <div className="p-2 bg-slate-50 rounded-lg"><BookIcon /></div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Minerva Ciencias</h3>
              <p className="text-sm text-slate-500 font-medium">Facultad de Ciencias de la Computación.</p>
            </div>
          </section>

          {/* SECCIÓN INFERIOR */}
          <section className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            
            {/* Zona de Carga */}
            <div className="xl:col-span-2 bg-slate-50/50 p-8 rounded-[20px] border border-dashed border-slate-300 flex flex-col items-center justify-center text-center group hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                <UploadCloudIcon />
              </div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Actualizar Kardex</h4>
              <p className="text-slate-500 text-sm mb-6 max-w-[250px] leading-relaxed">Arrastra tu PDF de Autoservicios aquí para re-calcular tu avance.</p>
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-xs shadow-sm hover:border-slate-300 hover:text-slate-900 transition-all">
                Explorar archivos
              </button>
            </div>

            {/* Optativas */}
            <div className="xl:col-span-3 bg-white p-8 rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">Rutas Sugeridas</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Basado en tus materias aprobadas</p>
                </div>
                <Link to="/rutas" className="text-[11px] font-bold text-slate-900 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">Ver todas</Link>
              </div>
              
              <div className="space-y-3">
                {materiasSugeridas.map((materia, index) => (
                  <div key={index} className="group flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400 tracking-tighter">
                        {materia.ruta.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{materia.clave}</p>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{materia.nombre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{materia.ruta}</span>
                      <ChevronRightIcon className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const SidebarLink = ({ title, icon, active }: { title: string; icon: React.ReactNode; active?: boolean }) => (
  <Link 
    to="#" 
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

// --- ICONOS SVG (Estilo Feather Icons / Heroicons Minimalistas) ---
// Todos son SVGs puros, lo que hace que el diseño se vea ultra limpio y profesional.

const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
);
const TargetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);
const PieChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
);
const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);
const UploadCloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export default Dashboard;