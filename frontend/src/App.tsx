import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Funciones from './pages/Funciones';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';

// Estilos globales rápidos para que se vea limpio
const globalStyles = `
  body { margin: 0; font-family: 'Inter', sans-serif; background-color: #fff; }
`;

function App() {
  return (
    <Router>
      <style>{globalStyles}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/funciones" element={<Funciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;