import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Para react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS de Bootstrap (opcional si usas componentes dinámicos)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);