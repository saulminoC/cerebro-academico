import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      backgroundColor: '#fff' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2.5rem', 
        borderRadius: '24px', 
        backgroundColor: '#fff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        border: '1px solid #f3f4f6'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827', textAlign: 'center' }}>
          Bienvenido de nuevo
        </h2>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Ingresa tus datos para acceder a tu cerebro académico.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={labelStyle}>Matrícula o Correo</label>
            <input 
              type="text" 
              placeholder="ejemplo@alumno.buap.mx" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle} 
            />
          </div>
          
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle} 
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Entrar al portal
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>¿Olvidaste tu contraseña?</span>
        </div>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#374151'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  backgroundColor: '#F9FAFB',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#003B5C',
  color: 'white',
  padding: '0.9rem',
  borderRadius: '12px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  marginTop: '0.5rem'
};

export default Login;