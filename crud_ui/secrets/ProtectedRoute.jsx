import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token"); // Verifique se o token existe

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/login" />} // Redireciona para a página de login se não estiver autenticado
    />
  );
};

export default ProtectedRoute;
