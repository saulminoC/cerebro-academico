import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1.2rem 8%', 
      borderBottom: '1px solid #f0f0f0', 
      alignItems: 'center', 
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ fontWeight: 800, fontSize: '1.6rem', color: '#003B5C', letterSpacing: '-1px' }}>
        SSAAI<span style={{ color: '#00B4D8' }}>.</span>
      </div>
      
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Link to="/" style={linkStyle}>Inicio</Link></li>
        <li><Link to="/nosotros" style={linkStyle}>Nosotros</Link></li>
        <li><Link to="/funciones" style={linkStyle}>Funciones</Link></li>
        <li><Link to="/contacto" style={linkStyle}>Contacto</Link></li>
      </ul>

      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
        <Link to="/login" style={{ 
          textDecoration: 'none', 
          color: '#4B5563', 
          fontWeight: 500,
          fontSize: '0.95rem'
        }}>
          Iniciar Sesión
        </Link>
        <Link to="/registro" style={{ 
          textDecoration: 'none', 
          backgroundColor: '#003B5C', 
          color: '#fff', 
          padding: '0.7rem 1.4rem', 
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '0.95rem',
          boxShadow: '0 4px 6px -1px rgba(0, 59, 92, 0.1)'
        }}>
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#6B7280',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.2s'
};

export default Navbar;