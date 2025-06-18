// src/components/common/Menu.jsx
import React from 'react';
import { Container, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';
import { PersonFill, CalendarFill, BoxArrowRight } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const currentDate = new Date().toLocaleDateString();

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    navigate('/login');
  };

  return (
    <Navbar expand="lg" sticky="top" style={{ 
      backgroundColor: '#34AEFF',
      borderBottomLeftRadius: '15px',
      borderBottomRightRadius: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }} className="mb-3">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0 me-2" />
        
        <Navbar.Brand as={Link} to="/" className="d-flex flex-column me-auto me-lg-0 mx-lg-auto">
          <span className="fw-bold fs-4">HOSPITAL</span>
          <span className="fw-bold text-danger fs-5">SYSCOM</span>
        </Navbar.Brand>

        {usuario ? (
          <div className="d-flex flex-column">
            <p className="small mb-0">Usuario: {usuario.username}</p>
            <p className="small mb-0">Fecha: {currentDate}</p>
          </div>
        ) : (
          <Button variant="outline-light" as={Link} to="/login">
            Iniciar Sesión
          </Button>
        )}

        <Navbar.Offcanvas id="offcanvasNavbar" placement="start" style={{ backgroundColor: '#e3f2fd' }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <span className="fw-bold">SISTEMA</span>
              <span className="text-danger fw-bold">SYSCOM</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {usuario ? (
                <>
                  <Nav.Link as={Link} to="#" className="d-flex align-items-center">
                    <PersonFill className="me-2" /> Usuario: {usuario.username}
                  </Nav.Link>
                  <Nav.Link as={Link} to="#" className="d-flex align-items-center">
                    <CalendarFill className="me-2" /> Fecha: {currentDate}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                  <Nav.Link as={Link} to="/">Salas</Nav.Link>
                  {usuario.role === 'admin' && (
                    <Nav.Link as={Link} to="/admin/configuracion">Administración</Nav.Link>
                  )}
                  <Nav.Link as={Button} variant="link" className="text-danger p-0" onClick={handleLogout}>
                    <BoxArrowRight className="me-2" /> Cerrar Sesión
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-primary">
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Menu;