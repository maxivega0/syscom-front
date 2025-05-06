import React from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { PersonFill, CalendarFill } from 'react-bootstrap-icons';

const Menu = () => {
  return (
    <Navbar 
      expand="lg" 
      sticky="top"
      style={{ 
        backgroundColor: '#34AEFF',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      className="mb-3"
    >
      <Container fluid>
        {/* Botón Hamburguesa - Siempre a la izquierda */}
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar" 
          className="border-0 me-2" 
        />
        
        {/* Título - Al lado del botón en móvil, centrado en tablet/desktop */}
        <Navbar.Brand 
          href="/" 
          className="d-flex flex-column me-auto me-lg-0 mx-lg-auto"
        >
          <span className="fw-bold fs-4">HOSPITAL</span>
          <span className="fw-bold text-danger fs-5">SYSCOM</span>
        </Navbar.Brand>

        {/* Datos de usuario - Siempre a la derecha */}
        <div className="d-flex flex-column">
          <p className="small mb-0">Usuario: UsuarioFalso</p>
          <p className="small mb-0">Fecha: 01/01/2025</p>
        </div>

        {/* Menú Offcanvas */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          style={{ backgroundColor: '#e3f2fd' }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <span className="fw-bold">SISTEMA</span>
              <span className="text-danger fw-bold">SYSCOM</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="#" className="d-flex align-items-center">
                <PersonFill className="me-2" /> Usuario: UsuarioFalso
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center">
                <CalendarFill className="me-2" /> Fecha: 01/01/2025
              </Nav.Link>
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/">Salas</Nav.Link>
              <Nav.Link href="#">Pacientes</Nav.Link>
              <Nav.Link href="#">Cerrar Sesión</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Menu;