import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// ── Tipos ──────────────────────────────────────────────────────────────────

interface Materia {
  id: number;
  clave: string;
  nombre: string;
  creditos: number;
  semestre: number;
  estado: 'aprobada' | 'cursando' | 'pendiente';
}

interface Ruta {
  id: string;
  nombre: string;
  descripcion: string;
  icon: React.ReactNode;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    badgeText: string;
    dot: string;
    ring: string;
    bar: string;
    cardSelected: string;
    iconBg: string;
  };
  keywords: string[]; // palabras clave para cruzar con nombres de materias
}

// ── Definición de rutas con keywords del plan Minerva 2016 ─────────────────

const RUTAS: Ruta[] = [
  {
    id: 'web',
    nombre: 'Desarrollo Web',
    descripcion: 'Crea aplicaciones para la web moderna, desde interfaces hasta arquitecturas de software escalables.',
    icon: <WebIcon />,
    color: {
      bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700',
      badge: 'bg-sky-100', badgeText: 'text-sky-700', dot: 'bg-sky-500',
      ring: 'ring-sky-300', bar: 'bg-sky-500', cardSelected: 'bg-sky-50 border-sky-300',
      iconBg: 'bg-sky-500',
    },
    keywords: ['web', 'aplicaciones web', 'interacción humano', 'software avanzada', 'tópicos selectos'],
  },
  {
    id: 'datos',
    nombre: 'Ciencia de Datos',
    descripcion: 'Extrae valor de grandes volúmenes de datos con minería, estadística avanzada y bases de datos distribuidas.',
    icon: <DataIcon />,
    color: {
      bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700',
      badge: 'bg-violet-100', badgeText: 'text-violet-700', dot: 'bg-violet-500',
      ring: 'ring-violet-300', bar: 'bg-violet-500', cardSelected: 'bg-violet-50 border-violet-300',
      iconBg: 'bg-violet-500',
    },
    keywords: ['minería', 'semántica', 'bases de datos avanzadas', 'big data', 'distribuidas', 'estadística avanzada'],
  },
  {
    id: 'ia',
    nombre: 'Inteligencia Artificial',
    descripcion: 'Diseña sistemas que aprenden y razonan: machine learning, heurísticas y modelos inteligentes.',
    icon: <AIIcon />,
    color: {
      bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700',
      badge: 'bg-rose-100', badgeText: 'text-rose-700', dot: 'bg-rose-500',
      ring: 'ring-rose-300', bar: 'bg-rose-500', cardSelected: 'bg-rose-50 border-rose-300',
      iconBg: 'bg-rose-500',
    },
    keywords: ['aprendizaje automático', 'heurísticas', 'estadística avanzada', 'minería'],
  },
  {
    id: 'redes',
    nombre: 'Redes y Seguridad',
    descripcion: 'Protege infraestructuras y diseña redes robustas con criptografía y técnicas avanzadas.',
    icon: <NetIcon />,
    color: {
      bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
      badge: 'bg-amber-100', badgeText: 'text-amber-700', dot: 'bg-amber-500',
      ring: 'ring-amber-300', bar: 'bg-amber-500', cardSelected: 'bg-amber-50 border-amber-300',
      iconBg: 'bg-amber-500',
    },
    keywords: ['redes avanzadas', 'criptografía', 'microprocesadores'],
  },
  {
    id: 'graficos',
    nombre: 'Gráficos y Videojuegos',
    descripcion: 'Desarrolla mundos interactivos, motores gráficos, y procesamiento de imágenes digitales.',
    icon: <GameIcon />,
    color: {
      bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700',
      badge: 'bg-emerald-100', badgeText: 'text-emerald-700', dot: 'bg-emerald-500',
      ring: 'ring-emerald-300', bar: 'bg-emerald-500', cardSelected: 'bg-emerald-50 border-emerald-300',
      iconBg: 'bg-emerald-500',
    },
    keywords: ['videojuegos', 'procesamiento digital', 'animación', 'computadora'],
  },
  {
    id: 'movil',
    nombre: 'Desarrollo Móvil',
    descripcion: 'Construye apps nativas y multiplataforma para iOS y Android con experiencias de usuario fluidas.',
    icon: <MobileIcon />,
    color: {
      bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700',
      badge: 'bg-orange-100', badgeText: 'text-orange-700', dot: 'bg-orange-500',
      ring: 'ring-orange-300', bar: 'bg-orange-500', cardSelected: 'bg-orange-50 border-orange-300',
      iconBg: 'bg-orange-500',
    },
    keywords: ['dispositivos móviles', 'interacción humano', 'aplicaciones web'],
  },
  {
    id: 'formal',
    nombre: 'Teoría y Sistemas',
    descripcion: 'Explora los fundamentos formales de la computación: compiladores, microprocesadores y métodos formales.',
    icon: <FormalIcon />,
    color: {
      bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700',
      badge: 'bg-slate-100', badgeText: 'text-slate-600', dot: 'bg-slate-500',
      ring: 'ring-slate-300', bar: 'bg-slate-700', cardSelected: 'bg-slate-50 border-slate-400',
      iconBg: 'bg-slate-700',
    },
    keywords: ['compiladores', 'microprocesadores', 'demostración', 'métodos formales'],
  },
];

// ── Componente principal ───────────────────────────────────────────────────

const RutasOptativas: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: '', apellidos: '', matricula: '' });
  const [optativas, setOptativas] = useState<Materia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [rutaSeleccionada, setRutaSeleccionada] = useState<string | null>(null);
  const [rutasFavoritas, setRutasFavoritas] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('rutasFavoritas') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    const cargar = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const [resMapa, resUser] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/mapa-curricular`, {
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
          }),
        ]);
        if (resMapa.ok) {
          const data: Record<string, Materia[]> = await resMapa.json();
          // Solo las optativas (semestre >= 9)
          const opts = Object.entries(data)
            .filter(([sem]) => parseInt(sem) >= 9)
            .flatMap(([, mats]) => mats);
          setOptativas(opts);
        }
        if (resUser.ok) setUsuario(await resUser.json());
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const toggleFavorita = (id: string) => {
    setRutasFavoritas(prev => {
      const next = prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id];
      localStorage.setItem('rutasFavoritas', JSON.stringify(next));
      return next;
    });
  };

  // Cruza keywords de cada ruta con los nombres de las optativas del alumno
  const getMateriasDeRuta = (ruta: Ruta): Materia[] =>
    optativas.filter(m =>
      ruta.keywords.some(kw => m.nombre.toLowerCase().includes(kw.toLowerCase()))
    );

  const getRutaStats = (ruta: Ruta) => {
    const mats = getMateriasDeRuta(ruta);
    const aprobadas = mats.filter(m => m.estado === 'aprobada').length;
    const cursando  = mats.filter(m => m.estado === 'cursando').length;
    const pct = mats.length > 0 ? Math.round(((aprobadas + cursando * 0.5) / mats.length) * 100) : 0;
    return { total: mats.length, aprobadas, cursando, pendientes: mats.length - aprobadas - cursando, pct };
  };

  const rutaActiva = RUTAS.find(r => r.id === rutaSeleccionada);
  const materiasActivas = rutaActiva ? getMateriasDeRuta(rutaActiva) : [];
  const statsActiva = rutaActiva ? getRutaStats(rutaActiva) : null;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} usuario={usuario} />

      <main className="flex-1 bg-white md:rounded-tl-[32px] md:border-l md:border-t border-slate-200/60 md:shadow-[-10px_0_30px_rgb(0,0,0,0.02)] md:m-2 h-[calc(100vh-16px)] overflow-y-auto">

        {/* ── Header ── */}
        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                Plan Minerva 2016 · FCC BUAP
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                Rutas Optativas
              </h1>
              <p className="text-[15px] text-slate-500 mt-2 max-w-lg">
                Elige tu especialidad y descubre qué materias optativas necesitas cursar para llegar ahí.
              </p>
            </div>
            {rutasFavoritas.length > 0 && (
              <div className="hidden md:flex flex-col items-end gap-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mis rutas</p>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {rutasFavoritas.map(id => {
                    const r = RUTAS.find(x => x.id === id);
                    if (!r) return null;
                    return (
                      <button key={id} onClick={() => setRutaSeleccionada(id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${r.color.badge} ${r.color.badgeText} ${r.color.border} transition-all hover:scale-105`}>
                        {r.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {cargando ? (
          <div className="flex items-center gap-3 p-12">
            <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-slate-500">Cargando rutas...</p>
          </div>
        ) : (
          <div className="px-8 md:px-12 py-8">

            {/* ── Grid de rutas ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-10">
              {RUTAS.map((ruta) => {
                const stats = getRutaStats(ruta);
                const isSelected = rutaSeleccionada === ruta.id;
                const isFav = rutasFavoritas.includes(ruta.id);

                return (
                  <button
                    key={ruta.id}
                    onClick={() => setRutaSeleccionada(isSelected ? null : ruta.id)}
                    className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `${ruta.color.cardSelected} ring-2 ${ruta.color.ring} shadow-lg scale-[1.02]`
                        : `bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:scale-[1.01]`
                    }`}
                  >
                    {/* Favorito */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleFavorita(ruta.id); }}
                      className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isFav ? `${ruta.color.badge} ${ruta.color.badgeText}` : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                      title={isFav ? 'Quitar de mis rutas' : 'Guardar ruta'}
                    >
                      <StarIcon filled={isFav} />
                    </button>

                    {/* Icono */}
                    <div className={`w-11 h-11 rounded-xl ${ruta.color.iconBg} flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110`}>
                      {ruta.icon}
                    </div>

                    <h3 className="text-[15px] font-black text-slate-900 mb-1 pr-8">{ruta.nombre}</h3>
                    <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{ruta.descripcion}</p>

                    {/* Stats */}
                    {stats.total > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-3">
                            {stats.aprobadas > 0 && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                {stats.aprobadas} aprobada{stats.aprobadas !== 1 ? 's' : ''}
                              </span>
                            )}
                            {stats.cursando > 0 && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                                {stats.cursando} en curso
                              </span>
                            )}
                          </div>
                          <span className={`text-[11px] font-black ${ruta.color.text}`}>{stats.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${ruta.color.bar} rounded-full transition-all duration-700`}
                            style={{ width: `${stats.pct}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-2">
                          {stats.total} materia{stats.total !== 1 ? 's' : ''} en esta ruta
                        </p>
                      </>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Sin materias registradas aún</p>
                    )}

                    {/* Indicador selected */}
                    {isSelected && (
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rotate-45 ${ruta.color.bg} border-r-2 border-b-2 ${ruta.color.border}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Panel detalle de ruta seleccionada ── */}
            {rutaActiva && statsActiva && (
              <div className={`rounded-3xl border-2 ${rutaActiva.color.border} ${rutaActiva.color.bg} p-8 transition-all duration-300`}>
                {/* Header del panel */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${rutaActiva.color.iconBg} flex items-center justify-center text-white`}>
                      {rutaActiva.icon}
                    </div>
                    <div>
                      <h2 className={`text-xl font-black ${rutaActiva.color.text}`}>{rutaActiva.nombre}</h2>
                      <p className="text-[13px] text-slate-500 mt-0.5">{rutaActiva.descripcion}</p>
                    </div>
                  </div>

                  {/* Resumen numérico */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <ResumenChip label="Aprobadas" value={statsActiva.aprobadas} color="text-emerald-700 bg-emerald-100 border-emerald-200" />
                    <ResumenChip label="En Curso"  value={statsActiva.cursando}  color="text-blue-700 bg-blue-100 border-blue-200" />
                    <ResumenChip label="Pendientes" value={statsActiva.pendientes} color="text-slate-600 bg-slate-100 border-slate-200" />
                  </div>
                </div>

                {/* Barra de progreso grande */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Progreso en esta ruta</p>
                    <span className={`text-2xl font-black ${rutaActiva.color.text}`}>{statsActiva.pct}%</span>
                  </div>
                  <div className="h-3 bg-white/70 rounded-full overflow-hidden border border-white">
                    <div className={`h-full ${rutaActiva.color.bar} rounded-full transition-all duration-1000`}
                      style={{ width: `${statsActiva.pct}%` }} />
                  </div>
                  {statsActiva.pct === 0 && (
                    <p className="text-[12px] text-slate-400 mt-2">
                      ¡Empieza por cualquiera de las materias de abajo! Recuerda que necesitas acreditar al menos 5 optativas en total.
                    </p>
                  )}
                  {statsActiva.pct > 0 && statsActiva.pct < 60 && (
                    <p className="text-[12px] text-slate-500 mt-2">
                      Buen inicio. Con {statsActiva.aprobadas} aprobada{statsActiva.aprobadas !== 1 ? 's' : ''}, vas construyendo tu perfil en {rutaActiva.nombre}.
                    </p>
                  )}
                  {statsActiva.pct >= 60 && (
                    <p className={`text-[12px] font-bold mt-2 ${rutaActiva.color.text}`}>
                      🎯 Sólido avance — ya tienes el perfil de {rutaActiva.nombre}.
                    </p>
                  )}
                </div>

                {/* Lista de materias */}
                {materiasActivas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {/* Aprobadas primero, luego cursando, luego pendientes */}
                    {(['aprobada', 'cursando', 'pendiente'] as const).flatMap(estado =>
                      materiasActivas
                        .filter(m => m.estado === estado)
                        .map(materia => (
                          <MateriaCard key={materia.id} materia={materia} rutaColor={rutaActiva.color} />
                        ))
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-400 font-medium text-[14px]">
                      No se encontraron materias registradas para esta ruta en tu plan de estudios.
                    </p>
                  </div>
                )}

                {/* Recomendación */}
                {statsActiva.pendientes > 0 && (
                  <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-white">
                    <p className="text-[12px] font-black text-slate-700 mb-1 uppercase tracking-wider">💡 Próximo paso recomendado</p>
                    {(() => {
                      const siguiente = materiasActivas.find(m => m.estado === 'pendiente');
                      return siguiente ? (
                        <p className="text-[14px] text-slate-600">
                          Considera inscribirte a{' '}
                          <span className={`font-black ${rutaActiva.color.text}`}>{siguiente.nombre}</span>
                          {' '}({siguiente.creditos} créditos) en tu próximo período.
                        </p>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* ── Estado vacío (ninguna seleccionada) ── */}
            {!rutaActiva && (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CompassIcon />
                </div>
                <h3 className="text-[16px] font-bold text-slate-700 mb-2">Selecciona una ruta</h3>
                <p className="text-[13px] text-slate-400 max-w-sm mx-auto">
                  Haz clic en cualquier especialidad para ver qué materias optativas necesitas y cuánto has avanzado.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// ── Sub-componentes ────────────────────────────────────────────────────────

const MateriaCard: React.FC<{ materia: Materia; rutaColor: Ruta['color'] }> = ({ materia, rutaColor }) => {
  const estadoConfig = {
    aprobada: {
      card: 'bg-emerald-50 border-emerald-200',
      clave: 'text-emerald-600',
      nombre: 'text-emerald-900',
      creditos: 'text-emerald-600',
      badge: 'bg-emerald-500',
      label: 'Aprobada',
      labelColor: 'text-emerald-700 bg-emerald-100',
      icon: <CheckIcon />,
    },
    cursando: {
      card: 'bg-blue-50 border-blue-200',
      clave: 'text-blue-600',
      nombre: 'text-blue-900',
      creditos: 'text-blue-600',
      badge: 'bg-blue-500',
      label: 'En Curso',
      labelColor: 'text-blue-700 bg-blue-100',
      icon: <PulseIcon />,
    },
    pendiente: {
      card: 'bg-white border-slate-200',
      clave: 'text-slate-400',
      nombre: 'text-slate-700',
      creditos: 'text-slate-400',
      badge: '',
      label: 'Pendiente',
      labelColor: 'text-slate-500 bg-slate-100',
      icon: null,
    },
  };
  const cfg = estadoConfig[materia.estado];

  return (
    <div className={`p-4 rounded-2xl border transition-all ${cfg.card}`}>
      <div className="flex items-start justify-between mb-2">
        <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.clave}`}>{materia.clave}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.labelColor}`}>
          {cfg.icon && <span className="w-3 h-3 flex items-center justify-center">{cfg.icon}</span>}
          {cfg.label}
        </span>
      </div>
      <h4 className={`text-[13px] font-bold leading-snug ${cfg.nombre}`}>{materia.nombre}</h4>
      <p className={`text-[11px] mt-2 font-semibold ${cfg.creditos}`}>{materia.creditos} créditos</p>
    </div>
  );
};

const ResumenChip: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className={`flex flex-col items-center px-4 py-2.5 rounded-xl border font-bold ${color}`}>
    <span className="text-2xl leading-none">{value}</span>
    <span className="text-[10px] uppercase tracking-wider mt-1 opacity-80">{label}</span>
  </div>
);

// ── Iconos de rutas ────────────────────────────────────────────────────────

function WebIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function DataIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}
function AIIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/>
    </svg>
  );
}
function NetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/>
      <rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/>
      <path d="M8 5h8M5 8v8M19 8v8M8 19h8"/>
    </svg>
  );
}
function GameIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
      <circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="17" cy="13" r="1" fill="currentColor"/>
      <path d="M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/>
    </svg>
  );
}
function MobileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}
function FormalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#e2e8f0"/>
    </svg>
  );
}
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function PulseIcon() {
  return <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />;
}

export default RutasOptativas;