import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal, Form, Card, Alert, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const PacienteDetalle = () => {
  const { nombrePaciente } = useParams();
  const [showSignosVitales, setShowSignosVitales] = useState(false);
  const [signosVitales, setSignosVitales] = useState([]);
  const [observacion, setObservacion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrosObservaciones, setRegistrosObservaciones] = useState([]);

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
        nombre: 'Paracetamol',
        via: 'Oral',
        horarios: ['08:00', '12:00', '16:00', '20:00']
      },
      {
        id: 2,
        nombre: 'Amoxicilina',
        via: 'Oral',
        horarios: ['07:30', '15:30', '23:30']
      },
      {
        id: 3,
        nombre: 'Insulina',
        via: 'Subcutánea',
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

  // Cargar observaciones guardadas al iniciar
  useEffect(() => {
  const cargarObservaciones = () => {
    try {
      const storedData = localStorage.getItem('registrosObservaciones');
      const guardadas = storedData ? JSON.parse(storedData) : [];
      const filtradas = guardadas.filter(reg => 
        reg && reg.pacienteId === nombrePaciente
      );
      setRegistrosObservaciones(filtradas);
    } catch (error) {
      console.error("Error al cargar observaciones:", error);
      setRegistrosObservaciones([]);
    }
  };
  
  cargarObservaciones();
}, [nombrePaciente]);

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

  // Obtener nombre de medicamento por ID
  const getNombreMedicamento = (id) => {
    const med = paciente.medicamentos.find(m => m.id === id);
    return med ? `${med.nombre} (${med.via})` : 'Medicamento desconocido';
  };

  // Obtener nombre de herida por ID
  const getNombreHerida = (id) => {
    const herida = paciente.heridas.find(h => h.id === id);
    return herida ? herida.nombre : 'Herida desconocida';
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
    switch (estado) {
      case 'completo': return 'success';
      case 'pendiente': return 'warning';
      default: return 'secondary';
    }
  };

  // Obtener ícono según estado
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'completo': return '✓';
      case 'pendiente': return '...';
      default: return '○';
    }
  };

  // Formatear cambios para mostrar en historial
  const formatCambios = (registro) => {
    const cambios = [];
    
    // Procesar medicamentos
    Object.entries(registro.estadosMedicamentos || {}).forEach(([key, estado]) => {
      const [medId, horario] = key.split('-');
      cambios.push({
        tipo: 'medicamento',
        nombre: getNombreMedicamento(parseInt(medId)),
        horario,
        estado
      });
    });
    
    // Procesar heridas
    Object.entries(registro.estadosHeridas || {}).forEach(([key, estado]) => {
      const [heridaId, horario] = key.split('-');
      cambios.push({
        tipo: 'herida',
        nombre: getNombreHerida(parseInt(heridaId)),
        horario,
        estado
      });
    });
    
    return cambios;
  };

  // Guardar observación junto con los estados actuales
  const guardarObservacion = () => {
    if (observacion.trim() === '') {
      alert('Por favor ingrese una observación');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      fechaHora: new Date().toISOString(),
      observacion: observacion.trim(),
      estadosMedicamentos: { ...horariosMedicamentos },
      estadosHeridas: { ...horariosHeridas },
      pacienteId: nombrePaciente
    };

    // Actualizar estado
    const nuevasObservaciones = [...registrosObservaciones, nuevoRegistro];
    setRegistrosObservaciones(nuevasObservaciones);
    
    // Guardar en localStorage
    const todasObservaciones = JSON.parse(localStorage.getItem('registrosObservaciones') || '[]');
    const otrasObservaciones = todasObservaciones.filter(reg => reg.id !== nuevoRegistro.id);
    localStorage.setItem(
      'registrosObservaciones', 
      JSON.stringify([...otrasObservaciones, nuevoRegistro])
    );

    // Resetear y mostrar feedback
    setObservacion('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            Observación registrada exitosamente!
          </Alert>
        )}

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
        <Card className="mb-5">
          <div className='p-3'>
            <h2 className="mb-3">Atención Médica</h2>
            <h4>Administración de Medicamentos</h4>
          </div>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Horarios</th>
              </tr>
            </thead>
            <tbody>
              {paciente.medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>
                    <strong>{med.nombre} ({med.via})</strong>
                  </td>
                  <td className='text-center'>
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-2">
                      {med.horarios.map((horario, index) => (
                        <span key={`${med.id}-${horario}`}>
                          {horario}{index < med.horarios.length - 1 && ' -'}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {med.horarios.map(horario => {
                        const estado = horariosMedicamentos[`${med.id}-${horario}`] || 'pendiente';
                        return (
                          <Button
                            key={`${med.id}-${horario}`}
                            variant={getEstadoClass(estado)}
                            size="sm"
                            className='me-2 mb-2'
                            onClick={() => {
                              const nuevosEstados = {
                                'pendiente': 'completo',
                                'completo': 'pendiente',
                              };
                              handleEstadoMedicamento(med.id, horario, nuevosEstados[estado]);
                            }}
                          >
                            {horario} {getEstadoIcon(estado)}
                          </Button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Sección de heridas */}
        <Card className="mb-5">
          <div className='p-3'>
            <h4>Cuidado de Heridas</h4>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Herida</th>
                <th>Horarios de Limpieza</th>
              </tr>
            </thead>
            <tbody>
              {paciente.heridas.map((herida) => (
                <tr key={herida.id}>
                  <td>
                    <strong>{herida.nombre}</strong>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-2">
                      {herida.horarios.map((horario, index) => (
                        <span key={`${herida.id}-${horario}`}>
                          {horario}{index < herida.horarios.length - 1 && ' -'}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {herida.horarios.map(horario => {
                        const estado = horariosHeridas[`${herida.id}-${horario}`] || 'pendiente';
                        return (
                          <Button
                            key={`${herida.id}-${horario}`}
                            variant={getEstadoClass(estado)}
                            size="sm"
                            className='me-2 mb-2'
                            onClick={() => {
                              const nuevosEstados = {
                                'pendiente': 'completo',
                                'completo': 'pendiente',
                              };
                              handleEstadoHerida(herida.id, horario, nuevosEstados[estado]);
                            }}
                          >
                            {horario} {getEstadoIcon(estado)}
                          </Button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Sección de observaciones */}
        <Card className="mb-4">
          <Card.Body>
            <h4>Observaciones</h4>
            
            <Form.Group className="mb-3">
              <Form.Label>Registrar observación (máx. 300 caracteres)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={300}
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Ingrese sus observaciones sobre el paciente..."
              />
              <Form.Text className="text-muted">
                {observacion.length}/300 caracteres
              </Form.Text>
            </Form.Group>
            
            <Row className="mt-3 g-2">
              <Col xs={6} md={3}>
                <Button 
                  variant="outline-primary" 
                  className="w-100"
                  onClick={guardarObservacion}
                >
                  REGISTRAR
                </Button>
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
          </Card.Body>
        </Card>

        {/* Historial de observaciones */}
        {registrosObservaciones.length > 0 && (
          <Card className="mb-4">
            <Card.Body>
              <h5>Historial de Observaciones</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Fecha/Hora</th>
                    <th>Observación</th>
                    <th>Cambios Registrados</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosObservaciones
                    .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
                    .map(reg => {
                      const cambios = formatCambios(reg);
                      return (
                        <tr key={reg.id}>
                          <td>{new Date(reg.fechaHora).toLocaleString()}</td>
                          <td>{reg.observacion}</td>
                          <td>
                            {cambios.length > 0 ? (
                              <ul className="list-unstyled mb-0">
                                {cambios.map((cambio, index) => (
                                  <li key={index} className="mb-1">
                                    <Badge bg={getEstadoClass(cambio.estado)} className="me-2">
                                      {cambio.estado === 'completo' ? 'Completado' : 'Pendiente'}
                                    </Badge>
                                    <strong>{cambio.nombre}</strong> a las {cambio.horario}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <small className="text-muted">Sin cambios registrados</small>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default PacienteDetalle;