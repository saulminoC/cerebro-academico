import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registro: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    // min-h-screen y flex aseguran que esté centrado igual que el login
    <div className="w-full min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
      
      {/* El max-w-[440px] es la clave, debe ser igual al del Login */}
      <div className="w-full max-w-[440px]">
        
        {/* Branding - Mismo tamaño y margen */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center transition-transform group-hover:-rotate-3">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SSAAI</span>
          </Link>
        </div>

        {/* Card de Registro - Ajustada en padding (p-8) para igualar altura */}
        <div className="bg-white border border-slate-200 p-8 md:p-9 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Crea tu cuenta</h1>
            <p className="text-slate-500 text-xs font-medium">Únete a la plataforma de la FCC.</p>
          </div>

          <form className="space-y-4">
            {/* Campo: Matrícula */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Matrícula</label>
              <input 
                type="text" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-950/5 focus:border-slate-950 transition-all font-medium text-slate-900 text-sm placeholder:text-slate-300" 
                placeholder="2021XXXXX"
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Contraseña</label>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-950/5 focus:border-slate-950 transition-all font-medium text-slate-900 text-sm placeholder:text-slate-300" 
                  placeholder="Mínimo 8 caracteres"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="text-[9px] font-black uppercase tracking-tighter">{showPass ? "Ocultar" : "Ver"}</span>
                </button>
              </div>
            </div>

            {/* Campo: Confirmar Contraseña */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Confirmar Contraseña</label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-950/5 focus:border-slate-950 transition-all font-medium text-slate-900 text-sm placeholder:text-slate-300" 
                  placeholder="Repite tu contraseña"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="text-[9px] font-black uppercase tracking-tighter">{showConfirmPass ? "Ocultar" : "Ver"}</span>
                </button>
              </div>
            </div>

            {/* Botón Registrar */}
            <button 
              type="submit" 
              className="w-full py-3.5 bg-slate-950 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg shadow-slate-950/10 active:scale-[0.99] mt-2"
            >
              Registrar cuenta
            </button>
          </form>

          {/* Link a Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-slate-900 hover:underline font-bold transition-all">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Footer legal */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">FCC BUAP 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Registro;