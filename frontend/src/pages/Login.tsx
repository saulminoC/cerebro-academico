import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // --- ESTADOS PARA LA LÓGICA ---
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // --- FUNCIÓN PARA INICIAR SESIÓN ---
  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/login`, {        method: 'POST',
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
        // 1. Guardamos el Token en la memoria secreta del navegador
        localStorage.setItem('token', datos.token);
        // 2. Guardamos los datos del usuario por si los ocupamos en el Dashboard
        localStorage.setItem('usuario', JSON.stringify(datos.usuario));
        
        // 3. ¡Lo mandamos al Dashboard!
        navigate('/dashboard');
      } else {
        // Si puso mal la contraseña o no existe
        setError(datos.message || datos.errors?.matricula?.[0] || 'Credenciales incorrectas, compa.');
      }
    } catch (err) {
      setError('No me pude conectar al servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* LADO IZQUIERDO: DISEÑO MINIMALISTA */}
      <section className="relative w-full md:w-[55%] bg-[#0d1117] flex flex-col justify-center p-12 lg:p-20 border-b md:border-b-0 md:border-r border-slate-800">
        <div className="relative z-10 max-w-xl">
          <Link to="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:-rotate-6 shadow-xl shadow-black/40">
              <span className="text-black font-black text-2xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase tracking-tighter">SSAAI</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-[-0.04em] leading-[1] mb-6">
            Bienvenido de <br />
            <span className="text-slate-500">vuelta.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-sm font-medium">
            Ingresa al Cerebro Académico para revisar tu avance y planificar tu próximo semestre.
          </p>
        </div>
      </section>

      {/* LADO DERECHO: FORMULARIO DE LOGIN */}
      <section className="w-full md:w-[45%] flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Iniciar Sesión</h2>
            <p className="text-slate-500 text-sm font-medium">Usa tu matrícula institucional.</p>
          </div>

          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={manejarLogin}>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Matrícula</label>
              <input 
                type="text" 
                required
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-slate-900 transition-all text-sm font-medium outline-none" 
                placeholder="202XXXXXX" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center pr-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Contraseña</label>
                <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-slate-900 transition-all text-sm font-medium outline-none" 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400 hover:text-slate-900">
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className={`w-full py-4 text-white font-bold text-sm rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 flex justify-center items-center gap-2
                ${cargando ? 'bg-slate-700 cursor-not-allowed' : 'bg-slate-950 hover:bg-slate-800'}`}
            >
              {cargando ? 'Entrando...' : 'Ingresar al sistema'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">¿Aún no tienes cuenta? <Link to="/registro" className="text-slate-900 hover:underline font-bold transition-all">Regístrate aquí</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;