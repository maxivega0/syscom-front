# syscom-front
=======

Sistema de seguimiento para enfermeros en un hospital.

Este proyecto permite a los enfermeros registrar en tiempo real las visitas realizadas a los pacientes, detallando:
- Dosis suministradas
- Heridas tratadas
- Observaciones relevantes sobre el estado del paciente

El objetivo es mejorar el control, la trazabilidad y la calidad del seguimiento médico en internación.

---

## Integrantes

| Legajo  | Nombre                        |
|---------|-------------------------------|
| 53223   | Galindo Lobo Martina          |
| 51366   | Morhill Samir                 |
| 53493   | Vega Maximiliano Leonel       |

---

## Tecnologías y Librerías utilizadas

- **React**  
- **Vite**  
- **React Bootstrap**  
- **React Router Dom**  
- **React Icons**
- **React Hook Form**
- **SweetAlert**

---


# Clonar el repositorio
git clone https://github.com/maxivega0/syscom-front.git

# Moverse a la carpeta
cd syscom-front

# Instalar las dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev


------

## Estructura del proyecto

```text
syscom-front/
├── public/               # Archivos públicos (favicon, etc.)
├── src/
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes reutilizables (botones, modales, tablas, etc.)
│   ├── views/            # Vistas principales (Home, Pacientes, Registro, etc.)
│   ├── routes/           # Definición de rutas
│   ├── services/         # Llamadas a la API y lógica de negocio
│   ├── helpers.js/            # Utilidades y helpers
│   ├── App.jsx           # Componente raíz
│   ├── main.jsx          # Punto de entrada de la app
├── package.json          # Dependencias y scripts
├── vite.config.js        # Configuración de Vite
└── README.md             # Este archivo
>>>>>>> 0ed2e0435d5e9a868f1abb5d4b83ef52c7a08f09

````
levantar db:
json-server --watch db.json --port 3000
