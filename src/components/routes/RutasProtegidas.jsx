// src/routes/RutasProtegidas.jsx
import { Navigate, Outlet } from "react-router-dom";

const RutasProtegidas = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;
    
    if (!usuarioLogueado) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
};

export default RutasProtegidas;