import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Badge, Button, Row, Col } from 'react-bootstrap';

const PacienteDetalle = () => {
  const { nombrePaciente } = useParams();

  // Estados para el seguimiento de horarios
  const [horariosMedicamentos, setHorariosMedicamentos] = useState({});
  const [horariosHeridas, setHorariosHeridas] = useState({});

  // Datos de ejemplo
  const paciente = {
    nombre: 'José Hernández',
    diagnostico: 'Historia clínica',
    medicamentos: [
      { 
        id: 1,
        nombre: 'Paracetamol (Oral)', 
        horarios: ['08:00', '12:00', '16:00', '20:00']
      },
      { 
        id: 2,
        nombre: 'Amoxicilina (Oral)', 
        horarios: ['07:30', '15:30', '23:30']
      },
      { 
        id: 3,
        nombre: 'Insulina (Subcutánea)', 
        horarios: ['08:00', '12:00', '16:00', '23:30']
      }
    ],
    heridas: [
      { 
        id: 1,
        nombre: 'Corte en brazo', 
        horarios: ['08:00', '12:00', '16:30', '20:00']
      },
      { 
        id: 2,
        nombre: 'Rasponazo en pierna', 
        horarios: ['07:30', '15:30', '23:30']
      }
    ]
  };

  // Manejar cambio de estado para medicamentos
  const handleEstadoMedicamento = (medId, horario, estado) => {
    setHorariosMedicamentos(prev => ({
      ...prev,
      [`${medId}-${horario}`]: estado
    }));
  };

  // Manejar cambio de estado para heridas
  const handleEstadoHerida = (heridaId, horario, estado) => {
    setHorariosHeridas(prev => ({
      ...prev,
      [`${heridaId}-${horario}`]: estado
    }));
  };

  // Obtener clase CSS según estado
  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'completo': return 'success';
      case 'pendiente': return 'warning';
      case 'falto': return 'danger';
      default: return 'secondary';
    }
  };

  // Obtener ícono según estado
  const getEstadoIcon = (estado) => {
    switch(estado) {
      case 'completo': return '✓';
      case 'pendiente': return '...';
      case 'falto': return '✗';
      default: return '○';
    }
  };

  return (
    <>
      <Container className="mt-4">
        {/* Encabezado del paciente */}
        <div className="mb-4">
          <h1>{paciente.nombre}</h1>
          <Badge bg="info" className="fs-5 mb-2">{paciente.diagnostico}</Badge>
          <h4 className="mt-3">Signos Vitales</h4>
          <hr />
        </div>

        {/* Sección de medicamentos */}
        <div className="mb-5">
          <h2 className="mb-3">Atención Médica</h2>
          <h4>Administración de Medicamentos</h4>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Horarios</th>
                <th>Medicamento</th>
              </tr>
            </thead>
            <tbody>
              {paciente.medicamentos.map((med) => (
                <React.Fragment key={med.id}>
                  <tr>
                    <td colSpan={2} className="text-center"><strong>{med.nombre}</strong></td>
                    </tr>
                    <tr>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {med.horarios.map(horario => {
                          const estado = horariosMedicamentos[`${med.id}-${horario}`] || 'pendiente';
                          return (
                            <p
                              key={`${med.id}-${horario}`}
                              
                            >
                               - {horario} 
                            </p>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      {med.horarios.map(horario => {
                          const estado = horariosMedicamentos[`${med.id}-${horario}`] || 'pendiente';
                          return (
                            <Button
                              key={`${med.id}-${horario}`}
                              variant={getEstadoClass(estado)}
                              className='me-3 my-2'
                              size="md"
                              onClick={() => {
                                const nuevosEstados = {
                                  'pendiente': 'completo',
                                  'completo': 'falto',
                                  'falto': 'pendiente'
                                };
                                handleEstadoMedicamento(med.id, horario, nuevosEstados[estado]);
                              }}
                            >
                              {getEstadoIcon(estado)}
                            </Button>
                          );
                        })}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Sección de heridas */}
        <div className="mb-5">
          <h4>Cuidado de Heridas</h4>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Horarios de Limpieza</th>
                <th>Herida</th>
              </tr>
            </thead>
            <tbody>
              {paciente.heridas.map((herida) => (
                <React.Fragment key={herida.id}>
                  <tr>
                    <td colSpan={2} className="text-center"><strong>{herida.nombre}</strong></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {herida.horarios.map(horario => {
                          const estado = horariosHeridas[`${herida.id}-${horario}`] || 'pendiente';
                          return (
                            <p
                              key={`${herida.id}-${horario}`}
                              
                            >
                              - {horario}
                            </p>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                    <div className="d-flex flex-wrap gap-2">
                        {herida.horarios.map(horario => {
                          const estado = horariosHeridas[`${herida.id}-${horario}`] || 'pendiente';
                          return (
                            <Button
                              key={`${herida.id}-${horario}`}
                              variant={getEstadoClass(estado)}
                              size="md"
                              className='me-3'
                              onClick={() => {
                                const nuevosEstados = {
                                  'pendiente': 'completo',
                                  'completo': 'falto',
                                  'falto': 'pendiente'
                                };
                                handleEstadoHerida(herida.id, horario, nuevosEstados[estado]);
                              }}
                            >
                              {getEstadoIcon(estado)}
                            </Button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Sección de observaciones */}
        <div className="mb-4">
          <h4>Observaciones</h4>
          <Row className="mt-3 g-2">
            <Col xs={6} md={3}>
              <Button variant="outline-primary" className="w-100">REGISTRAR</Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-secondary" className="w-100">Otros</Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-danger" as={Link} to={`/pacientes`} className="w-100">
                Atras
              </Button>
            </Col>
            <Col xs={6} md={3}>
              <Button variant="outline-success" className="w-100">Progreso</Button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default PacienteDetalle;