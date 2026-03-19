import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Funciones from './pages/Funciones';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import MapaCurricular from './pages/MapaCurricular';
import RutasOptativas from './pages/RutasOptativas';

// --- COMPONENTE AUXILIAR PARA CONTROLAR EL NAVBAR ---
const RutasConLayout = () => {
  const location = useLocation();
  
  // Lista de rutas donde NO queremos el Navbar público
  // AQUÍ ESTÁ EL CAMBIO: Ya dice '/rutas'
  const rutasSinNavbar = ['/login', '/registro', '/dashboard', '/mapa-curricular', '/rutas'];
  const mostrarNavbar = !rutasSinNavbar.includes(location.pathname);

  return (
    <>
      {mostrarNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/funciones" element={<Funciones />} />
        <Route path="/contacto" element={<Contacto />} />
        
        {/* Rutas del Sistema (Sin Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mapa-curricular" element={<MapaCurricular />} />
        
        {/* AQUÍ ESTÁ EL OTRO CAMBIO: path="/rutas" */}
        <Route path="/rutas" element={<RutasOptativas />} />
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