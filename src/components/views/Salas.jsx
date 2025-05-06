import React from 'react';
import { Container, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import Menu from '../common/Menu';

const Salas = () => {
  // Datos de ejemplo
  const habitacionesCriticas = [
    { numero: '202', ocupacion: '4/4' },
    { numero: '201', ocupacion: '3/4' },
    { numero: '206', ocupacion: '2/4' },
    { numero: '207', ocupacion: '4/4' }
  ];

  const habitacionesEnEspera = [
    { numero: '205', ocupacion: '1/4' },
    { numero: '203', ocupacion: '3/5' },
    { numero: '204', ocupacion: '2/4' },
    { numero: '208', ocupacion: '1/4' }
  ];

  // Función para dividir el array en dos columnas
  const splitIntoColumns = (array) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];
  };

  const [col1Criticas, col2Criticas] = splitIntoColumns(habitacionesCriticas);
  const [col1Espera, col2Espera] = splitIntoColumns(habitacionesEnEspera);

  return (
    <>
      
      <Container className="mt-3 mb-5">
        <h4 className="text-center mb-4">Habitaciones</h4>
        
        {/* Sección Horario Crítico */}
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
              <span>Horario Crítico (rango 15min)</span>
              <Badge bg="light" text="dark">{habitacionesCriticas.length}</Badge>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6} className="d-flex flex-column gap-2">
                {col1Criticas.map((habitacion) => (
                  <Button 
                    key={habitacion.numero}
                    variant="outline-danger" 
                    className="py-3"
                    href={`/pacientes/${habitacion.numero}`}
                  >
                    <div className="fw-bold">{habitacion.numero}</div>
                    <Badge bg="danger" pill>{habitacion.ocupacion}</Badge>
                  </Button>
                ))}
              </Col>
              <Col xs={6} className="d-flex flex-column gap-2">
                {col2Criticas.map((habitacion) => (
                  <Button 
                    key={habitacion.numero}
                    variant="outline-danger" 
                    className=" py-3 "
                    href={`/pacientes/${habitacion.numero}`}
                  >
                    <div className="fw-bold ">{habitacion.numero}</div>
                    <Badge bg="danger" pill>{habitacion.ocupacion}</Badge>
                  </Button>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Sección En Espera */}
        <Card className="shadow-sm">
          <Card.Header className="bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
              <span>En espera</span>
              <Badge bg="light" text="dark">{habitacionesEnEspera.length}</Badge>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6} className="d-flex flex-column gap-2">
                {col1Espera.map((habitacion) => (
                  <Button 
                    key={habitacion.numero}
                    variant="outline-dark" 
                    className="py-2"
                    href={`/pacientes/${habitacion.numero}`}
                  >
                    <div className="fw-bold">{habitacion.numero}</div>
                    <Badge bg="dark" text="white" pill>{habitacion.ocupacion}</Badge>
                  </Button>
                ))}
              </Col>
              <Col xs={6} className="d-flex flex-column gap-2">
                {col2Espera.map((habitacion) => (
                  <Button 
                    key={habitacion.numero}
                    variant="outline-dark" 
                    className="py-2"
                    href={`/pacientes/${habitacion.numero}`}
                  >
                    <div className="fw-bold">{habitacion.numero}</div>
                    <Badge bg="dark" text="white" pill>{habitacion.ocupacion}</Badge>
                  </Button>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Estilos personalizados */}
      <style jsx>{`
        .square-btn {
          aspect-ratio: 1/1;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .square-btn > div, 
        .square-btn > span {
          position: absolute;
        }
        .square-btn > div {
          top: 30%;
        }
        .square-btn > span {
          bottom: 30%;
        }
      `}</style>
    </>
  );
};

export default Salas;