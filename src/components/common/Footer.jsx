import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;