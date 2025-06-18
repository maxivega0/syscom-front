import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import Menu from '../common/Menu';
import styles from './PacientesSala.module.css'; 

const PacientesSala = () => {
  const { numeroSala } = useParams();
  
  // Datos de ejemplo con estados
  const pacientes = [
    { id: 1, nombre: 'José Hernández', edad: 45, estado: 'critico' },
    { id: 2, nombre: 'Juan Pérez', edad: 32, estado: 'normal' },
    { id: 3, nombre: 'María García', edad: 28, estado: 'normal' },
    { id: 4, nombre: 'Carlos Sánchez', edad: 50, estado: 'normal' },
  ];

  // Dividir pacientes en dos columnas
  const mitad = Math.ceil(pacientes.length / 2);
  const columna1 = pacientes.slice(0, mitad);
  const columna2 = pacientes.slice(mitad);

  // Determinar estilos según estado
  const getBorderStyle = (estado) => {
    return estado === 'critico' ? '3px solid #dc3545' : '3px solid #000000';
  };

  const getIconColor = (estado) => {
    return estado === 'critico' ? '#dc3545' : '#000000';
  };

  return (
    <>      
      <Container className="mt-3 mb-5">
        {/* Encabezado con número de sala */}
        <div className="text-center mb-4">
          <h1 className="display-4">Habitación {numeroSala}</h1>
          <Badge bg="secondary" className="fs-5 p-2">
            Pacientes: {pacientes.length}/4
          </Badge>
        </div>

        {/* Sección de pacientes en dos columnas */}
        <Row>
          {/* Columna 1 */}
          <Col xs={6} className="d-flex flex-column gap-3">
            {columna1.map((paciente) => (
              <Button
              key={paciente.id}
              as={Link}
              to={`/paciente/${paciente.nombre}`}
                variant="light"
                className={styles['patient-button']}
                style={{ 
                  border: getBorderStyle(paciente.estado),
                  borderBottomWidth: '5px'
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <PersonFill 
                    size={32} 
                    className="mb-2" 
                    color={getIconColor(paciente.estado)} 
                  />
                  <span className="fw-bold">{paciente.nombre}</span>
                  <small className="text-muted">{paciente.edad} años</small>
                </div>
              </Button>
            ))}
          </Col>

          {/* Columna 2 */}
          <Col xs={6} className="d-flex flex-column gap-3">
            {columna2.map((paciente) => (
              <Button
                key={paciente.id}
                as={Link}
                to={`/paciente/${paciente.nombre}`}
                variant="light"
                className={styles['patient-button']}
                style={{ 
                  border: getBorderStyle(paciente.estado),
                  borderBottomWidth: '5px'
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <PersonFill 
                    size={32} 
                    className="mb-2" 
                    color={getIconColor(paciente.estado)} 
                  />
                  <span className="fw-bold">{paciente.nombre}</span>
                  <small className="text-muted">{paciente.edad} años</small>
                </div>
              </Button>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PacientesSala;