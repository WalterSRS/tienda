import React, { useEffect, useState } from 'react';
import '../assetss/css/Home.css';
import axios from 'axios';
import { Apiurl } from "../service/apirest";

const Home = () => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [error, setError] = useState("");
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = sessionStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get(`${Apiurl}categorias/`);
            setCategorias(response.data);
        } catch (error) {
            setError("Error al cargar categorías");
        }
    };

    const fetchProductos = async (categoriaId) => {
        try {
            const response = await axios.get(`${Apiurl}categorias/${categoriaId}/getproduct/`);
            setProductos(response.data);
        } catch (error) {
            setError("Error al cargar productos");
        }
    };

    const handleCategoriaClick = (categoriaId) => {
        setSelectedCategoria(categoriaId);
        fetchProductos(categoriaId);
    };

    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(p => p.id === producto.id);
            if (productoExistente) {
                return prevCarrito.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    const actualizarCantidad = (id, cantidad) => {
        setCarrito(prevCarrito => 
            prevCarrito.map(p => 
                p.id === id ? { ...p, cantidad: Math.max(1, cantidad) } : p
            )
        );
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(prevCarrito => prevCarrito.filter(p => p.id !== id));
    };

    // Función para calcular el total
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => 
            total + (producto.precio_unitario * producto.cantidad), 0).toFixed(2);
    };

    // Función para manejar el pago (aquí solo mostramos un alert)
    const manejarPago = () => {
        alert(`Total a pagar: $${calcularTotal()}`);
        // Aquí podrías implementar la lógica para procesar el pago
    };

    return (
        <div>
            <h1>Productos</h1>
            {error && <p className="error">{error}</p>}
            <div className="container">
                <div className="categorias">
                    <h2>Categorías</h2>
                    <ul>
                        {categorias.map(categoria => (
                            <li 
                                key={categoria.id} 
                                onClick={() => handleCategoriaClick(categoria.id)}
                                className={selectedCategoria === categoria.id ? 'selected' : ''}
                            >
                                {categoria.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="productos">
                    <h2>Productos</h2>
                    {selectedCategoria ? (
                        <ul>
                            {productos.map(producto => (
                                <li key={producto.id} className="product-details">
                                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                                    <p><strong>Descripción:</strong> {producto.descripcion}</p>
                                    <p><strong>Información:</strong> {producto.informacion}</p>
                                    <p><strong>Precio Unitario:</strong> ${producto.precio_unitario}</p>
                                    <p><strong>IVA:</strong> ${producto.iva}</p>
                                    <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Seleccione una categoría para ver los productos</p>
                    )}
                </div>
                <div className="carrito">
                    <h2>Carrito de Compras</h2>
                    <ul>
                        {carrito.map(producto => (
                            <li key={producto.id} className="carrito-item">
                                <p><strong>Nombre:</strong> {producto.nombre}</p>
                                <p><strong>Cantidad:</strong>
                                    <input
                                        type="number"
                                        value={producto.cantidad}
                                        onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
                                    />
                                </p>
                                <p><strong>Precio:</strong> ${producto.precio_unitario * producto.cantidad}</p>
                                <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <div className="carrito-total">
                        <p><strong>Total:</strong> ${calcularTotal()}</p>
                        <button onClick={manejarPago}>Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
