# syscom-front

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
- **Tailwind CSS**  
- **React Router Dom**  
- **Axios**  
- **Heroicons** (para íconos)  
- **React Hook Form** (para formularios, si corresponde)  
- **Zod** (para validaciones, si corresponde)  
- **React Toastify** (para notificaciones, si corresponde)  

---

## Estructura del proyecto

syscom-front/
├── public/               # Archivos públicos (favicon, etc.)
├── src/
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes reutilizables (botones, modales, tablas, etc.)
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Vistas principales (Home, Pacientes, Registro, etc.)
│   ├── routes/           # Definición de rutas
│   ├── services/         # Llamadas a la API y lógica de negocio
│   ├── utils/            # Utilidades y helpers
│   ├── App.jsx           # Componente raíz
│   ├── main.jsx          # Punto de entrada de la app
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
├── vite.config.js        # Configuración de Vite
└── README.md             # Este archivo



# Clonar el repositorio
git clone https://github.com/maxivega0/syscom-front.git

# Moverse a la carpeta
cd syscom-front

# Instalar las dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
