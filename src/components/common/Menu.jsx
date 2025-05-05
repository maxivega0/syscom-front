import React from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { PersonFill, CalendarFill } from 'react-bootstrap-icons';

const Menu = () => {
  return (
    <Navbar 
      expand="lg" 
      sticky="top"
      style={{ 
        backgroundColor: '#34AEFF', // Color celeste claro
        borderBottomLeftRadius: '15px', // Borde redondeado inferior izquierdo
        borderBottomRightRadius: '15px', // Borde redondeado inferior derecho
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Sombra sutil para profundidad
      }}
      className="mb-3"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex flex-column">
          <span className="fw-bold fs-4">HOSPITAL</span>
          <span className="fw-bold text-danger fs-5">SYSCOM</span>
        </Navbar.Brand>
        
        <div className="d-flex flex-column me-3 d-lg-none">
          <p className="small">Usuario: UsuarioFalso</p>
          <p className="small">Fecha: 01/01/2025</p>
        </div>
        
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          style={{ backgroundColor: '#e3f2fd' }} // Mismo color celeste para el offcanvas
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <span className="fw-bold">SISTEMA</span>
              <span className="text-danger fw-bold">SYSCOM</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#" className="d-flex align-items-center">
                <PersonFill className="me-2" /> Usuario: UsuarioFalso
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center">
                <CalendarFill className="me-2" /> Fecha: 01/01/2025
              </Nav.Link>
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Salas</Nav.Link>
              <Nav.Link href="#">Pacientes</Nav.Link>
              <Nav.Link href="#">Cerrar Sesion</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        
        <div className="d-none d-lg-flex ms-auto">
          <div className="d-flex flex-column me-4">
            <p className="small">Usuario: UsuarioFalso</p>
            <p className="small">Fecha: 01/01/2025</p>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Menu;