import { API_URL } from './api';

async function fetchPacientes() {
  try {
    const res = await fetch(`http://localhost:3000//pacientes`);
    const data = await res.json();
    return data; // array de pacientes
  } catch (err) {
    console.error('Error al fetch:', err);
  }
}


async function crearPaciente(nuevoPaciente) {
    try {
      const res = await fetch(`http://localhost:3000//pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPaciente),
      });
      const data = await res.json();
      return data; // objeto del paciente recién creado
    } catch (err) {
      console.error('Error al crear:', err);
    }
  }

  
  async function actualizarPaciente(id, pacienteActualizado) {
    try {
      const res = await fetch(`http://localhost:3000//pacientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteActualizado),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error al actualizar:', err);
    }async function borrarPaciente(id) {
        try {
          await fetch(`http://localhost:3000//pacientes/${id}`, {
            method: 'DELETE',
          });
          return true;
        } catch (err) {
          console.error('Error al borrar:', err);
          return false;
        }
      }
      
  }

  
  async function fetchPaciente(id) {
    try {
      const res = await fetch(`http://localhost:3000//pacientes` + id);
      const data = await res.json();
      return data; // array de pacientes
    } catch (err) {
      console.error('Error al fetch:', err);
    }
  }
  