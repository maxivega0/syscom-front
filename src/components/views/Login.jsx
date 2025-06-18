// src/components/views/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Usuario hardcodeado
  const hardcodedUser = {
    email: 'admin@syscom.com',
    password: 'syscom123',
    username: 'Enfermero1',
    role: 'admin' // Agregamos rol para manejar permisos
  };

  const onSubmit = (data) => {
    if (data.email === hardcodedUser.email && data.password === hardcodedUser.password) {
      // Guardar en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify({
        username: hardcodedUser.username,
        email: hardcodedUser.email,
        role: hardcodedUser.role
      }));

      // Mostrar alerta de bienvenida
      Swal.fire({
        title: '¡Bienvenido!',
        text: `Bienvenido ${hardcodedUser.username} a Syscom!`,
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        // Redirigir al dashboard después del login
        navigate('/');
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: '400px', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-danger fw-bold">HOSPITAL</h2>
              <h4 className="text-secondary">SYSCOM</h4>
              <h3 className="mt-4">¡Bienvenido!</h3>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electronico:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Máximo 50 caracteres'
                    }
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 8,
                      message: 'Mínimo 8 caracteres'
                    },
                    maxLength: {
                      value: 16,
                      message: 'Máximo 16 caracteres'
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      message: 'Debe contener letras y números'
                    }
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;