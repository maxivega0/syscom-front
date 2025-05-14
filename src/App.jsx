import { Button, Container, Navbar } from 'react-bootstrap'; // Componentes de React-Bootstrap
import { House, Gear } from 'react-bootstrap-icons'; // Íconos
import { useForm } from 'react-hook-form'; // Para formularios
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'; // Para rutas
import Menu from './components/common/Menu'
import Swal from 'sweetalert2'; // Alertas
import withReactContent from 'sweetalert2-react-content'; // Alertas con React
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/common/Footer';
import Salas from './components/views/Salas';
import PacientesSala from './components/views/PacientesSala';
import PacienteDetalle from './components/views/PacienteDetalle';
import Layout from './components/common/Layout';

const MySwal = withReactContent(Swal); // Configuración de SweetAlert2 con React

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Layout>
      <Menu></Menu>
      <Routes>
      <Route path="/" element={<Salas />} />
      <Route path="/pacientes/:numeroSala" element={<PacientesSala />} />
      <Route path="/paciente/:nombrePaciente" element={<PacienteDetalle />} />
      </Routes>
      
    </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;