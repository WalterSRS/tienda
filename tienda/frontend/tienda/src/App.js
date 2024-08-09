import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componente de ruta protegida
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

// Componente de redirección para el login si ya está autenticado
const RedirectIfAuthenticated = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/home" /> : <Element {...rest} />;
};

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {/* Si ya está autenticado, redirige al Home */}
          <Route path="/" element={<RedirectIfAuthenticated element={Login} />} />
          
          {/* Ruta protegida para Home */}
          <Route path="/home" element={<ProtectedRoute element={Home} />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
