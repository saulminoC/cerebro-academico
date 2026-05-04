import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registro: React.FC = () => {
  // --- ESTADOS PARA LA LÓGICA DEL FORMULARIO ---
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Estados visuales (Ojitos de los gatos y mostrar contraseña)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getEyeStyle = (eyeRef: React.RefObject<HTMLDivElement>) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const dx = mousePos.x - (rect.left + rect.width / 2);
    const dy = mousePos.y - (rect.top + rect.height / 2);
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(6, Math.sqrt(dx * dx + dy * dy) / 45);
    return { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)` };
  };

  const cat1EyeL = useRef<HTMLDivElement>(null);
  const cat1EyeR = useRef<HTMLDivElement>(null);
  const cat2EyeL = useRef<HTMLDivElement>(null);
  const cat2EyeR = useRef<HTMLDivElement>(null);

  // --- FUNCIÓN QUE SE EJECUTA AL DAR CLIC EN "REGISTRAR CUENTA" ---
  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');

    // Validaciones básicas en el frontend
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden, compa.');
      return;
    }
    if (matricula.length < 9) {
      setError('La matrícula debe tener 9 números.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch('https://ssaai.saulmino.sbs/api-backend/public/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          matricula: matricula,
          password: password,
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        // Si todo sale bien, lo mandamos al Login
        alert('¡Registro exitoso! Ya eres parte del Cerebro Académico.');
        navigate('/login');
      } else {
        // Si Laravel nos devuelve un error (ej. matrícula repetida)
        setError(datos.message || 'Error al registrar. Revisa tus datos.');
      }
    } catch (err) {
      setError('No me pude conectar al servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* --- LADO IZQUIERDO: DISEÑO DE GATITOS (SIN CAMBIOS) --- */}
      <section 
        className="relative w-full md:w-[55%] bg-[#0d1117] flex flex-col justify-center p-12 lg:p-20 border-b md:border-b-0 md:border-r border-slate-800"
        style={{ cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' style='font-size:30px'><text y='30'>%F0%9F%90%AD</text></svg>") 16 16, auto` }}
      >
        <div className="relative z-10 max-w-xl">
          <Link to="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:-rotate-6 shadow-xl shadow-black/40">
              <span className="text-black font-black text-2xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase tracking-tighter">SSAAI</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[-0.04em] leading-[1] mb-6">
            Gestiona tu avance <br />
            <span className="text-slate-500">académico.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-16 max-w-sm font-medium">
            La herramienta definitiva para alumnos de la FCC.
          </p>

          <div className="flex gap-12 items-end pt-12 border-t border-white/5">
            <div className="relative flex flex-col items-center">
              <div className="flex justify-between w-24 mb-[-12px] px-2">
                <div className="w-6 h-8 bg-slate-900 rounded-t-full -rotate-12 border-t border-slate-800"></div>
                <div className="w-6 h-8 bg-slate-900 rounded-t-full rotate-12 border-t border-slate-800"></div>
              </div>
              <div className="relative w-32 h-24 bg-slate-900 rounded-t-[40px] rounded-b-xl border border-slate-800 flex flex-col items-center justify-center shadow-2xl">
                <div className="flex gap-4 mb-2">
                  <Eye ref={cat1EyeL} style={getEyeStyle(cat1EyeL)} />
                  <Eye ref={cat1EyeR} style={getEyeStyle(cat1EyeR)} />
                </div>
                <div className="text-[10px] text-slate-700 font-bold mt-1 select-none whitespace-pre tracking-widest">  w  </div>
                <div className="absolute top-1/2 left-[-10px] text-slate-800 text-[10px] rotate-[-10deg]">━━<br/>━━</div>
                <div className="absolute top-1/2 right-[-10px] text-slate-800 text-[10px] rotate-[10deg]">━━<br/>━━</div>
              </div>
            </div>

            <div className="relative flex flex-col items-center opacity-80">
              <div className="flex justify-between w-16 mb-[-10px] px-1">
                <div className="w-5 h-6 bg-slate-700 rounded-t-full -rotate-12"></div>
                <div className="w-5 h-6 bg-slate-700 rounded-t-full rotate-12"></div>
              </div>
              <div className="relative w-24 h-18 bg-slate-700 rounded-t-[30px] rounded-b-lg border border-slate-600 flex flex-col items-center justify-center">
                <div className="flex gap-3 mb-1">
                  <Eye ref={cat2EyeL} style={getEyeStyle(cat2EyeL)} size="sm" />
                  <Eye ref={cat2EyeR} style={getEyeStyle(cat2EyeR)} size="sm" />
                </div>
                <div className="text-[8px] text-slate-500 font-bold leading-none">w</div>
              </div>
            </div>
            {/*<p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] ml-4 self-center italic">FCC Surveillance</p>*/}
          </div>
        </div>
      </section>

      {/* --- LADO DERECHO: FORMULARIO CONECTADO A LARAVEL --- */}
      <section className="w-full md:w-[45%] flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Crea tu cuenta</h2>
            <p className="text-slate-500 text-sm font-medium">Ingresa tus datos institucionales.</p>
          </div>

          {/* MENSAJE DE ERROR (Aparece si hay broncas) */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Agregamos onSubmit al form */}
          <form className="space-y-4" onSubmit={manejarRegistro}>
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Matrícula</label>
              <input 
                type="text" 
                required
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)} // Guardamos lo que teclea
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-slate-900 transition-all text-sm font-medium outline-none" 
                placeholder="202XXXXXX" 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Contraseña</label>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Guardamos la contraseña
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-slate-900 transition-all text-sm font-medium outline-none" 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400 hover:text-slate-900">
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Confirmar</label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  required
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)} // Guardamos confirmación
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-slate-900 transition-all text-sm font-medium outline-none" 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400 hover:text-slate-900">
                  {showConfirmPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {/* Botón dinámico (Se desactiva mientras carga) */}
            <button 
              type="submit" 
              disabled={cargando}
              className={`w-full py-4 text-white font-bold text-sm rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 flex justify-center items-center gap-2
                ${cargando ? 'bg-slate-700 cursor-not-allowed' : 'bg-slate-950 hover:bg-slate-800'}`}
            >
              {cargando ? 'Registrando...' : 'Registrar cuenta'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">¿Ya tienes cuenta? <Link to="/login" className="text-slate-900 hover:underline font-bold transition-all">Inicia sesión</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Eye = React.forwardRef<HTMLDivElement, { style: React.CSSProperties; size?: 'sm' | 'md' }>(({ style, size = 'md' }, ref) => (
  <div ref={ref} className={`${size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'} bg-white rounded-full flex items-center justify-center border border-black/10`}>
    <div className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} bg-slate-950 rounded-full transition-transform duration-75`} style={style} />
  </div>
));

export default Registro;