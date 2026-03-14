import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Funciones from './pages/Funciones';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';

// --- COMPONENTE AUXILIAR PARA CONTROLAR EL NAVBAR ---
// Esto revisa en qué ruta estamos y decide si dibuja el Navbar o no.
const RutasConLayout = () => {
  const location = useLocation();
  
  // Lista de rutas donde NO queremos el Navbar público
  const rutasSinNavbar = ['/login', '/registro', '/dashboard'];
  const mostrarNavbar = !rutasSinNavbar.includes(location.pathname);

  return (
    <>
      {mostrarNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/funciones" element={<Funciones />} />
        <Route path="/contacto" element={<Contacto />} />
        
        {/* Rutas sin Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* ¡Aquí está tu Dashboard! */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  return (
    <Router>
      <RutasConLayout />
    </Router>
  );
}

export default App;