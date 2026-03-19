import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-[8%] py-[1.2rem] border-b border-[#f0f0f0] bg-white sticky top-0 z-[100]">
      
      {/* Logo */}
      <div className="font-extrabold text-[1.6rem] text-[#003B5C] tracking-[-1px]">
        SSAAI<span className="text-[#00B4D8]">.</span>
      </div>
      
      {/* Botón Menú Hamburguesa (Solo visible en móviles) */}
      <button 
        className="md:hidden flex flex-col gap-[5px] p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#003B5C] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-[#003B5C] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-[#003B5C] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
      </button>

      {/* Contenedor de Enlaces y Botones */}
      <div className={`
        ${isOpen ? 'flex' : 'hidden'} 
        absolute md:static top-full left-0 w-full md:w-auto 
        bg-white md:bg-transparent border-b md:border-none border-[#f0f0f0] 
        flex-col md:flex-row items-center md:flex 
        gap-6 md:gap-[2.5rem] py-6 md:py-0 px-[8%] md:px-0 
        shadow-lg md:shadow-none transition-all duration-300
      `}>
        
        {/* Enlaces de Navegación */}
        <ul className="flex flex-col md:flex-row gap-6 md:gap-[2.5rem] list-none m-0 p-0 items-center w-full md:w-auto">
          <li>
            <Link to="/" className="text-[#6B7280] font-medium text-[0.95rem] transition-colors hover:text-[#003B5C]" onClick={() => setIsOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/nosotros" className="text-[#6B7280] font-medium text-[0.95rem] transition-colors hover:text-[#003B5C]" onClick={() => setIsOpen(false)}>Nosotros</Link>
          </li>
          <li>
            <Link to="/funciones" className="text-[#6B7280] font-medium text-[0.95rem] transition-colors hover:text-[#003B5C]" onClick={() => setIsOpen(false)}>Funciones</Link>
          </li>
          <li>
            <Link to="/contacto" className="text-[#6B7280] font-medium text-[0.95rem] transition-colors hover:text-[#003B5C]" onClick={() => setIsOpen(false)}>Contacto</Link>
          </li>
        </ul>

        {/* Botones de Sesión */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[1.2rem] items-center w-full md:w-auto mt-2 md:mt-0">
          <Link 
            to="/login" 
            className="text-[#4B5563] font-medium text-[0.95rem] no-underline"
            onClick={() => setIsOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/registro" 
            className="bg-[#003B5C] text-white px-[1.4rem] py-[0.7rem] rounded-[10px] font-semibold text-[0.95rem] shadow-[0_4px_6px_-1px_rgba(0,59,92,0.1)] no-underline text-center w-full md:w-auto"
            onClick={() => setIsOpen(false)}
          >
            Registrarse
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;