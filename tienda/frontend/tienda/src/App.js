import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './components/Login';
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carrito from './components/Carrito';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Carrito" element={<Carrito />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
