import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Badge, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const PacienteDetalle = () => {
  const { nombrePaciente } = useParams();
  const [showSignosVitales, setShowSignosVitales] = useState(false);
  const [signosVitales, setSignosVitales] = useState([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Estados para el seguimiento de horarios
  const [horariosMedicamentos, setHorariosMedicamentos] = useState({});
  const [horariosHeridas, setHorariosHeridas] = useState({});

  // Datos de ejemplo
  const paciente = {
    nombre: nombrePaciente,
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

  // Manejar envío del formulario de signos vitales
  const onSubmitSignosVitales = (data) => {
    const nuevoRegistro = {
      ...data,
      fecha: new Date().toISOString(),
      pacienteId: nombrePaciente
    };
    
    setSignosVitales([...signosVitales, nuevoRegistro]);
    setShowSignosVitales(false);
    reset();
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
        <div className="mb-4 d-flex justify-content-between">
          <div>
          <h1>{paciente.nombre}</h1>
          </div>
          <div className='d-flex flex-column'>
          <Button bg="info" className="fs-5 mb-2">Historia Clinica</Button>
          <Button className="mt-3" onClick={() => setShowSignosVitales(true)}>Signos Vitales</Button>
          </div>
          <hr />
        </div>

        {/* Modal para signos vitales */}
        <Modal show={showSignosVitales} onHide={() => setShowSignosVitales(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Signos Vitales</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmitSignosVitales)}>
              <Form.Group className="mb-3">
                <Form.Label>Presión Arterial (mmHg)</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: 120/80"
                  {...register("presion", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\d{2,3}\/\d{2,3}$/,
                      message: "Formato inválido (ej: 120/80)"
                    }
                  })}
                />
                {errors.presion && <span className="text-danger">{errors.presion.message}</span>}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Temperatura (°C)</Form.Label>
                <Form.Control 
                  type="number" 
                  step="0.1"
                  placeholder="Ej: 36.5"
                  {...register("temperatura", { 
                    required: "Este campo es requerido",
                    min: {
                      value: 35,
                      message: "La temperatura debe ser mayor a 35°C"
                    },
                    max: {
                      value: 42,
                      message: "La temperatura debe ser menor a 42°C"
                    }
                  })}
                />
                {errors.temperatura && <span className="text-danger">{errors.temperatura.message}</span>}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Oxígeno en Sangre (%)</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Ej: 98"
                  {...register("oxigeno", { 
                    required: "Este campo es requerido",
                    min: {
                      value: 70,
                      message: "El valor debe ser mayor a 70%"
                    },
                    max: {
                      value: 100,
                      message: "El valor debe ser menor o igual a 100%"
                    }
                  })}
                />
                {errors.oxigeno && <span className="text-danger">{errors.oxigeno.message}</span>}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Pulso (latidos/min)</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Ej: 75"
                  {...register("pulso", { 
                    required: "Este campo es requerido",
                    min: {
                      value: 40,
                      message: "El pulso debe ser mayor a 40 lpm"
                    },
                    max: {
                      value: 200,
                      message: "El pulso debe ser menor a 200 lpm"
                    }
                  })}
                />
                {errors.pulso && <span className="text-danger">{errors.pulso.message}</span>}
              </Form.Group>
              
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Sección de medicamentos */}
        <div className="mb-5">
          <h2 className="mb-3">Atención Médica</h2>
          <h4>Administración de Medicamentos</h4>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Horarios</th>        
              </tr>
            </thead>
            <tbody>
              {paciente.medicamentos.map((med) => (
                <React.Fragment key={med.id}>
                  <tr>
                    
                    <td>
                    <td colSpan={2} className="text-center"><strong>{med.nombre}</strong></td>
                    </td>
                    <td className='text-center'>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {med.horarios.map(horario => {
                          const estado = horariosMedicamentos[`${med.id}-${horario}`] || 'pendiente';
                          return (
                            <p
                              key={`${med.id}-${horario}`}
                              
                            >
                               {horario} -
                            </p>
                          );
                        })}
                      </div>
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