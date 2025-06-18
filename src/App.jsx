import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Salas from './components/views/Salas';
import PacientesSala from './components/views/PacientesSala';
import PacienteDetalle from './components/views/PacienteDetalle';
import Layout from './components/common/Layout';
import Login from './components/views/Login';
import RutasProtegidas from './components/routes/RutasProtegidas';
import RutasAdministrador from './components/routes/RutasADministrador';

function App() {
  return (
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Layout principal con Menu y Footer */}
        <Route element={<Layout />}>
          {/* Rutas protegidas */}
          <Route element={<RutasProtegidas />}>
            <Route path="/" element={<Salas />} />
            <Route path="/pacientes/:numeroSala" element={<PacientesSala />} />
            <Route path="/paciente/:nombrePaciente" element={<PacienteDetalle />} />
          </Route>
          
          {/* Rutas de administrador (anidadas dentro de protegidas) */}
          <Route path="/admin" element={<RutasAdministrador />}>
            {/* Aquí puedes agregar rutas específicas de admin */}
            <Route path="configuracion" element={<h1>Configuración del Sistema</h1>} />
          </Route>
        </Route>
        
        {/* Ruta no encontrada */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
  );
}

export default App;