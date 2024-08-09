import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assetss/css/Register.css';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        nombre: '',
        password: ''
    });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const API_URL = 'http://localhost:8000/api/usuarios/register/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, form);
            if (response.data.valido === "True") {
                navigate('/'); // Redirigir al login después de registrarse
            } else {
                setError(true);
                setErrorMsg(response.data.mensaje);
            }
        } catch (error) {
            console.error('Error registrando usuario:', error.response ? error.response.data : error.message);
            setError(true);
            setErrorMsg('Error de conexión');
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <React.Fragment>
            <div className="register-container">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombre Completo:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{errorMsg}</p>}
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Register;
