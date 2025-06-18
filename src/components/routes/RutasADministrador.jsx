// src/routes/RutasAdministrador.jsx
import { Navigate, Outlet } from "react-router-dom";

const RutasAdministrador = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;
    
    if (!usuarioLogueado || usuarioLogueado.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};

export default RutasAdministrador;