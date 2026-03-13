import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
      
      {/* Contenedor principal */}
      <div className="w-full max-w-[440px]">
        
        {/* Branding sutil */}
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center transition-transform group-hover:-rotate-3">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SSAAI</span>
          </Link>
        </div>

        {/* Card de Login */}
        <div className="bg-white border border-slate-200 p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Inicia sesión</h1>
            <p className="text-slate-500 text-sm font-medium">Gestiona tu trayectoria académica en la FCC.</p>
          </div>

          <form className="space-y-5">
            {/* Campo: Matrícula */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Matrícula</label>
              <input 
                type="text" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-slate-950/5 focus:border-slate-950 transition-all font-medium text-slate-900 placeholder:text-slate-300" 
                placeholder="Ej. 2021XXXXX"
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contraseña</label>
                <a href="#" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors underline decoration-slate-200">¿La olvidaste?</a>
              </div>
              <input 
                type="password" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-slate-950/5 focus:border-slate-950 transition-all font-medium text-slate-900 placeholder:text-slate-300" 
                placeholder="••••••••"
              />
            </div>

            {/* Botón Acceder */}
            <button 
              type="submit" 
              className="w-full py-4 bg-slate-950 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg shadow-slate-950/10 active:scale-[0.99] mt-2"
            >
              Entrar al sistema
            </button>
          </form>

          {/* Registro */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              ¿Eres nuevo?{' '}
              <Link to="/registro" className="text-slate-900 hover:underline font-bold transition-all">
                Crea una cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Footer legal */}
        <div className="mt-8 flex justify-center gap-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">FCC BUAP 2026</p>
          <span className="text-slate-200">|</span>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Privacidad</p>
        </div>
      </div>
    </div>
  );
};

export default Login;