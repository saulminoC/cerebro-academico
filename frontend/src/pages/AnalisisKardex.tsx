{/* analisis de kardex */}
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Avance {
  clave: string;
  nombre: string;
  creditos: number;
  calificacion: number | string;
  estado: string;
}

const AnalisisKardex: React.FC = () => {
  const [historial, setHistorial] = useState<Avance[]>([]);
  const [cargando, setCargando] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: '', apellidos: '', matricula: '' });

  const [busqueda, setBusqueda] = useState('');
  // Agregamos el filtro 'en curso'
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'aprobada' | 'reprobada' | 'cursando'>('todas');

  useEffect(() => {
    const cargarHistorial = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const resHistorial = await fetch(`${import.meta.env.VITE_API_URL}/historial-kardex`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        if (resHistorial.ok) setHistorial(await resHistorial.json());

        const resUser = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        if (resUser.ok) setUsuario(await resUser.json());

      } catch (e) {
        console.error("Error al cargar historial", e);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, []);

  const materiasFiltradas = historial.filter(materia => {
    const coincideBusqueda = materia.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             materia.clave.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todas' || materia.estado.toLowerCase() === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const totalAprobadas = historial.filter(m => m.estado.toLowerCase() === 'aprobada').length;
  // Solo contamos las verdaderamente reprobadas
  const totalReprobadas = historial.filter(m => m.estado.toLowerCase() === 'reprobada').length;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
      
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        usuario={usuario} 
      />

      <main className="flex-1 p-8 md:p-12 bg-white md:rounded-tl-[32px] md:border-l md:border-t border-slate-200/60 md:shadow-[-10px_0_30px_rgb(0,0,0,0.02)] md:m-2 h-[calc(100vh-16px)] overflow-y-auto">
        
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Análisis de Kardex</h1>
          <p className="text-[15px] text-slate-500 mt-2">Explora y filtra tu historial académico al detalle.</p>
        </header>

        {cargando ? (
          <div className="flex items-center gap-3 mt-10">
             <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-sm font-bold text-slate-500">Analizando registros...</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[20px] p-6 border border-slate-200/60 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Total Procesadas</span>
                </div>
                <span className="text-[40px] leading-none font-black text-slate-800 tracking-tight">{historial.length}</span>
              </div>

              <div className="bg-white rounded-[20px] p-6 border border-slate-200/60 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Aprobadas</span>
                </div>
                <span className="text-[40px] leading-none font-black text-slate-800 tracking-tight">{totalAprobadas}</span>
              </div>

              <div className="bg-white rounded-[20px] p-6 border border-slate-200/60 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.4)]"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Reprobadas</span>
                </div>
                <span className="text-[40px] leading-none font-black text-slate-800 tracking-tight">{totalReprobadas}</span>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="relative w-full xl:w-[320px]">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar materia o clave..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all text-[14px] text-slate-700 shadow-sm placeholder:text-slate-400"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              {/* Botones de filtro actualizados */}
              <div className="flex flex-wrap items-center bg-slate-100/80 p-1 rounded-[14px] border border-slate-200/50">
                <button onClick={() => setFiltroEstado('todas')} className={`px-4 py-1.5 rounded-[10px] text-[12px] font-bold transition-all ${filtroEstado === 'todas' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>Todas</button>
                <button onClick={() => setFiltroEstado('aprobada')} className={`px-4 py-1.5 rounded-[10px] text-[12px] font-bold transition-all ${filtroEstado === 'aprobada' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>Aprobadas</button>
                <button onClick={() => setFiltroEstado('cursando')} className={`px-4 py-1.5 rounded-[10px] text-[12px] font-bold transition-all ${filtroEstado === 'cursando' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>En Curso</button>
                <button onClick={() => setFiltroEstado('reprobada')} className={`px-4 py-1.5 rounded-[10px] text-[12px] font-bold transition-all ${filtroEstado === 'reprobada' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>Reprobadas</button>
              </div>
            </div>

            <div className="border border-slate-200/60 rounded-[20px] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md">
                    <tr className="border-b border-slate-200/60 text-slate-400 text-[10px] uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold">Clave</th>
                      <th className="px-6 py-4 font-bold">Materia</th>
                      <th className="px-6 py-4 font-bold text-center">Créditos</th>
                      <th className="px-6 py-4 font-bold text-center">Calificación</th>
                      <th className="px-6 py-4 font-bold text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {materiasFiltradas.length > 0 ? (
                      materiasFiltradas.map((materia, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 text-[13px] font-semibold text-slate-400/80">{materia.clave}</td>
                          <td className="px-6 py-4 text-[14px] font-bold text-slate-800">{materia.nombre}</td>
                          <td className="px-6 py-4 text-[13px] font-semibold text-center text-slate-500">{materia.creditos}</td>
                          {/* Muestra un guión si está en curso */}
                          <td className="px-6 py-4 text-[14px] font-black text-center text-slate-900">
                            {materia.estado.toLowerCase() === 'cursando' ? '-' : materia.calificacion}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {/* Lógica de colores del badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${
                              materia.estado.toLowerCase() === 'aprobada' 
                                ? 'bg-emerald-50/30 text-emerald-700 border-emerald-100/50' 
                                : materia.estado.toLowerCase() === 'cursando'
                                ? 'bg-blue-50/30 text-blue-700 border-blue-100/50'
                                : 'bg-rose-50/30 text-rose-700 border-rose-100/50'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                materia.estado.toLowerCase() === 'aprobada' ? 'bg-emerald-500' : 
                                materia.estado.toLowerCase() === 'en curso' ? 'bg-blue-500' : 'bg-rose-500'
                              }`}></span>
                              {materia.estado}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-12 text-center">
                          <p className="text-slate-500 font-medium text-[14px]">No se encontraron materias con esos criterios.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default AnalisisKardex;