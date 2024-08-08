import React, { useState } from "react";
import '../assetss/css/Login.css';
import logo from '../assetss/img/logo.png';
import { Apiurl } from "../service/apirest";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const manejadorSubmit = (e) => {
        e.preventDefault();
        manejadorBoton();
    }

    const manejadorChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const manejadorBoton = () => {
        let url = `${Apiurl}usuarios/login/`;
        axios.post(url, form)
            .then(response => {
                if (response.data.valido === "True") {
                    sessionStorage.setItem("token", response.data.result.token);
                    navigate("/home");
                } else {
                    setError(true);
                    setErrorMsg(response.data.mensaje);
                }
            })
            .catch(error => {
                setError(true);
                setErrorMsg("Error de conexión");
            });
    }

    return (
        <React.Fragment>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <br />
                        <img src={logo} width="150px" alt="User Icon" />
                        <br />
                    </div>
                    <br />
                    <form onSubmit={manejadorSubmit}>
                        <input type="text" className="fadeIn second" name="username" placeholder="Usuario" onChange={manejadorChange} />
                        <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange} />
                        <input type="submit" className="fadeIn fourth" value="Ingresar" />
                    </form>
                    {error && <div id="formFooter">{errorMsg}</div>}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
