import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Materia {
  id: number;
  clave: string;
  nombre: string;
  creditos: number;
  semestre: number;
  estado: 'aprobada' | 'cursando' | 'pendiente';
}

const MapaCurricular: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapa, setMapa] = useState<Record<string, Materia[]>>({});
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState({ nombre: '', apellidos: '', matricula: '' });
  const [filtro, setFiltro] = useState<'todas' | 'aprobada' | 'cursando' | 'pendiente'>('todas');

  useEffect(() => {
    const cargarDatos = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const [resMapa, resUser] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/mapa-curricular`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
          })
        ]);
        if (resMapa.ok) setMapa(await resMapa.json());
        if (resUser.ok) setUsuario(await resUser.json());
      } catch (e) {
        console.error('Error al cargar el mapa', e);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Obligatorias = semestres 1–8 | Optativas = semestre_sugerido >= 9
  const materiasObligatorias = [1,2,3,4,5,6,7,8].flatMap(s => mapa[s] || []);
  const materiasOptativas: Materia[] = Object.entries(mapa)
    .filter(([sem]) => parseInt(sem) >= 9)
    .flatMap(([, mats]) => mats);

  const aprobadasObligatorias = materiasObligatorias.filter(m => m.estado === 'aprobada').length;
  const cursandoObligatorias  = materiasObligatorias.filter(m => m.estado === 'cursando').length;
  const aprobadasOptativas    = materiasOptativas.filter(m => m.estado === 'aprobada').length;
  const cursandoOptativas     = materiasOptativas.filter(m => m.estado === 'cursando').length;
  const pctObligatorias = materiasObligatorias.length > 0
    ? Math.round((aprobadasObligatorias / materiasObligatorias.length) * 100) : 0;

  const getCardStyle = (estado: string) => {
    if (estado === 'aprobada') return {
      card: 'bg-emerald-50 border-emerald-200',
      clave: 'text-emerald-600', nombre: 'text-emerald-900', creditos: 'text-emerald-600',
      badgeBg: 'bg-emerald-500', badgeIcon: <CheckIcon />,
    };
    if (estado === 'cursando') return {
      card: 'bg-blue-50 border-blue-200',
      clave: 'text-blue-600', nombre: 'text-blue-900', creditos: 'text-blue-600',
      badgeBg: 'bg-blue-500', badgeIcon: <PulseIcon />,
    };
    return {
      card: 'bg-white border-slate-200 hover:border-slate-300',
      clave: 'text-slate-400', nombre: 'text-slate-700', creditos: 'text-slate-400',
      badgeBg: null, badgeIcon: null,
    };
  };

  const filtrarMaterias = (mats: Materia[]) =>
    filtro === 'todas' ? mats : mats.filter(m => m.estado === filtro);

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} usuario={usuario} />

      <main className="flex-1 bg-white md:rounded-tl-[32px] md:border-l md:border-t border-slate-200/60 md:shadow-[-10px_0_30px_rgb(0,0,0,0.02)] md:m-2 h-[calc(100vh-16px)] overflow-y-auto">

        {/* ── Header sticky ── */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 px-8 md:px-12 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Mapa Curricular</h1>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Licenciatura en Ciencias de la Computación · Plan Minerva 2016
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatChip dot="bg-emerald-500" label={`${aprobadasObligatorias} obligatorias aprobadas`} />
              {cursandoObligatorias > 0 && <StatChip dot="bg-blue-500" label={`${cursandoObligatorias} en curso`} />}
              <StatChip dot="bg-violet-500" label={`${aprobadasOptativas} optativas aprobadas`} />
              {cursandoOptativas > 0 && <StatChip dot="bg-blue-400" label={`${cursandoOptativas} optativas en curso`} />}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 min-w-[140px]">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${pctObligatorias}%` }} />
                </div>
                <span className="text-[12px] font-black text-slate-700">{pctObligatorias}%</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-[12px] border border-slate-200/50 w-fit">
            {(['todas', 'aprobada', 'cursando', 'pendiente'] as const).map(f => (
              <button key={f} onClick={() => setFiltro(f)}
                className={`px-4 py-1.5 rounded-[8px] text-[12px] font-bold transition-all ${
                  filtro === f ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'
                }`}>
                {{ todas:'Todas', aprobada:'Aprobadas', cursando:'En Curso', pendiente:'Pendientes' }[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-10">
          {cargando ? (
            <div className="flex items-center gap-3 mt-10">
              <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-slate-500">Cargando mapa curricular...</p>
            </div>
          ) : (
            <>
              {/* ── NIVEL BÁSICO semestres 1–4 ── */}
              <SectionHeader
                label="Nivel Básico"
                labelColor="bg-slate-100 text-slate-600 border-slate-200"
                subtitle="Semestres 1 – 4 · Fundamentos de la disciplina"
              />
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {[1,2,3,4].map(sem => (
                  <SemestreCol key={sem} semestre={sem} materias={mapa[sem] || []}
                    filtradas={filtrarMaterias(mapa[sem] || [])} getCardStyle={getCardStyle} />
                ))}
              </div>

              {/* ── NIVEL FORMATIVO semestres 5–8 ── */}
              <SectionHeader
                label="Nivel Formativo"
                labelColor="bg-orange-50 text-orange-700 border-orange-200"
                subtitle="Semestres 5 – 8 · Especialización y proyectos"
              />
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {[5,6,7,8].map(sem => (
                  <SemestreCol key={sem} semestre={sem} materias={mapa[sem] || []}
                    filtradas={filtrarMaterias(mapa[sem] || [])} getCardStyle={getCardStyle} />
                ))}
              </div>

              {/* ── OPTATIVAS DESIT ── */}
              {materiasOptativas.length > 0 && (
                <>
                  <SectionHeader
                    label="Optativas DESIT"
                    labelColor="bg-violet-50 text-violet-700 border-violet-200"
                    subtitle={`Acredita 5 de ${materiasOptativas.length} materias disponibles`}
                    badge={`${aprobadasOptativas + cursandoOptativas} / ${materiasOptativas.length}`}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filtrarMaterias(materiasOptativas).length > 0 ? (
                      filtrarMaterias(materiasOptativas).map(materia => {
                        const cfg = getCardStyle(materia.estado);
                        return (
                          <div key={materia.id} className={`p-3.5 rounded-xl border transition-all ${cfg.card}`}>
                            <div className="flex justify-between items-start mb-1.5">
                              <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.clave}`}>
                                {materia.clave}
                              </span>
                              {cfg.badgeBg && (
                                <div className={`w-4 h-4 ${cfg.badgeBg} rounded-full flex items-center justify-center shrink-0`}>
                                  {cfg.badgeIcon}
                                </div>
                              )}
                            </div>
                            <h4 className={`text-[12px] font-bold leading-snug ${cfg.nombre}`}>{materia.nombre}</h4>
                            <p className={`text-[11px] mt-2 font-semibold ${cfg.creditos}`}>{materia.creditos} créditos</p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-full p-6 text-center rounded-xl border border-dashed border-slate-200">
                        <p className="text-[13px] text-slate-400 font-medium">Sin materias con este filtro</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ── Leyenda ── */}
              <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Leyenda</span>
                {[
                  { bg: 'bg-emerald-100 border-emerald-300', label: 'Aprobada' },
                  { bg: 'bg-blue-100 border-blue-300', label: 'En Curso' },
                  { bg: 'bg-white border-slate-300', label: 'Pendiente' },
                ].map(({ bg, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm border ${bg}`} />
                    <span className="text-[12px] text-slate-600 font-medium">{label}</span>
                  </div>
                ))}
                <div className="ml-auto text-[11px] text-slate-400 font-medium">Plan Minerva 2016 · FCC BUAP</div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// ── Sub-componentes ─────────────────────────────────────

const SemestreCol: React.FC<{
  semestre: number;
  materias: Materia[];
  filtradas: Materia[];
  getCardStyle: (e: string) => any;
}> = ({ semestre, materias, filtradas, getCardStyle }) => {
  const aprobadas = materias.filter(m => m.estado === 'aprobada').length;
  const cursando  = materias.filter(m => m.estado === 'cursando').length;
  const completo  = aprobadas === materias.length && materias.length > 0;
  const pct = materias.length > 0 ? Math.round((aprobadas / materias.length) * 100) : 0;

  return (
    <div className="min-w-[240px] w-[240px] shrink-0 snap-start flex flex-col gap-2">
      <div className={`rounded-xl p-3 border ${completo ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200/60'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            {completo && <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"><CheckIcon /></div>}
            <span className={`text-[13px] font-black ${completo ? 'text-emerald-800' : 'text-slate-700'}`}>
              Semestre {semestre}
            </span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${completo ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
            {aprobadas}/{materias.length}
          </span>
        </div>
        <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${cursando > 0 && !completo ? 'bg-blue-400' : 'bg-emerald-500'}`}
            style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtradas.length > 0 ? filtradas.map(materia => {
          const cfg = getCardStyle(materia.estado);
          return (
            <div key={materia.id} className={`p-3.5 rounded-xl border transition-all ${cfg.card}`}>
              <div className="flex justify-between items-start mb-1.5">
                <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.clave}`}>{materia.clave}</span>
                {cfg.badgeBg && (
                  <div className={`w-4 h-4 ${cfg.badgeBg} rounded-full flex items-center justify-center shrink-0`}>
                    {cfg.badgeIcon}
                  </div>
                )}
              </div>
              <h4 className={`text-[13px] font-bold leading-snug ${cfg.nombre}`}>{materia.nombre}</h4>
              <p className={`text-[11px] mt-2 font-semibold ${cfg.creditos}`}>{materia.creditos} créditos</p>
            </div>
          );
        }) : (
          <div className="p-4 text-center rounded-xl border border-dashed border-slate-200">
            <p className="text-[11px] text-slate-400 font-medium">Sin resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{
  label: string; labelColor: string; subtitle: string; badge?: string;
}> = ({ label, labelColor, subtitle, badge }) => (
  <div className="flex items-center gap-3">
    <div className={`px-3 py-1 rounded-lg border text-[11px] font-black uppercase tracking-wider ${labelColor}`}>
      {label}
    </div>
    <p className="text-[13px] text-slate-500 font-medium">{subtitle}</p>
    {badge && (
      <span className="ml-auto text-[12px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg">
        {badge}
      </span>
    )}
  </div>
);

const StatChip: React.FC<{ dot: string; label: string }> = ({ dot, label }) => (
  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2">
    <div className={`w-2 h-2 rounded-full ${dot}`} />
    <span className="text-[12px] font-bold text-slate-600">{label}</span>
  </div>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PulseIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="white">
    <circle cx="3" cy="3" r="2.5" />
  </svg>
);

export default MapaCurricular;