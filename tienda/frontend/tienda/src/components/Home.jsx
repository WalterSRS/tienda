import React, { useEffect, useState } from 'react';
import '../assetss/css/Home.css';
import axios from 'axios';
import { Apiurl } from "../service/apirest";

const Home = () => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [error, setError] = useState("");
    const [carrito, setCarrito] = useState([]); // Nuevo estado para el carrito

    useEffect(() => {
        fetchCategorias();
    }, []);

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

    // Función para agregar productos al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            // Verificar si el producto ya está en el carrito
            const productoExistente = prevCarrito.find(p => p.id === producto.id);
            if (productoExistente) {
                // Actualizar la cantidad si el producto ya existe en el carrito
                return prevCarrito.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            // Agregar el producto al carrito con cantidad inicial de 1
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    // Función para actualizar la cantidad de un producto en el carrito
    const actualizarCantidad = (id, cantidad) => {
        setCarrito(prevCarrito => 
            prevCarrito.map(p => 
                p.id === id ? { ...p, cantidad: Math.max(1, cantidad) } : p
            )
        );
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito(prevCarrito => prevCarrito.filter(p => p.id !== id));
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
                </div>
            </div>
        </div>
    );
};

export default Home;
