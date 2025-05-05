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

const MySwal = withReactContent(Swal); // Configuración de SweetAlert2 con React

function App() {
  const { register, handleSubmit } = useForm(); // Uso de react-hook-form

  const showAlert = () => {
    MySwal.fire({
      title: "¡Éxito!",
      text: "Operación completada",
      icon: "success"
    });
  };

  return (
    <>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={
          <>
            <h1>React con Bootstrap</h1>
            <Button variant="primary" onClick={showAlert}>
              <House className="me-2" /> Mostrar alerta
            </Button>
          </>
        } />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;