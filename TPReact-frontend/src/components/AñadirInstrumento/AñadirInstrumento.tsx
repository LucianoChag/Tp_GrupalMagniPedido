import { useState, useEffect } from 'react';

const AñadirInstrumento = () => {
    const [instrumentos, setInstrumentos] = useState([]);
    const [formulario, setFormulario] = useState({
        cantidad_vendida: '',
        costo_envio: '',
        descripcion: '',
        imagen: '',
        instrumento: '',
        marca: '',
        modelo: '',
        precio: '',
        categoria_id: '',
    });

    useEffect(() => {
        fetch("http://localhost:8080/instrumentos/")
            .then((response) => response.json()) 
            .then((instrumentos) => {
                setInstrumentos(instrumentos);
            })
            .catch((error) => {
                console.error('Error al obtener instrumentos:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del nuevo instrumento:', formulario);
    
        // Si no se proporciona ninguna imagen, establece imagen_no_disponible.png como imagen por defecto
        const imagen = formulario.imagen || 'imagen_no_disponible.png';
    
        // Construir el objeto instrumento con la imagen por defecto si no se proporciona ninguna imagen
        const nuevoInstrumento = { ...formulario, imagen };
    
        // Construir la solicitud POST con el objeto instrumento en el cuerpo
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoInstrumento)
        };
    
        // Realizar la solicitud POST
        fetch('http://localhost:8080/instrumentos/', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al añadir el instrumento');
                }
                alert("Instrumento añadido exitosamente");

                console.log('Instrumento añadido exitosamente');
                // Aquí puedes realizar cualquier acción adicional después de añadir el instrumento
            })
            .catch(error => {
                console.error('Error al añadir el instrumento:', error);
            });
    };

    return (
        <div>
            <h1>Añadir Instrumento</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Instrumento:
                    <input required
                        type="text"
                        name="instrumento"
                        value={formulario.instrumento}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Cantidad Vendida:
                    <input required
                        type="number"
                        name="cantidad_vendida"
                        value={formulario.cantidad_vendida}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Costo de Envío:
                    <input required
                        type="text"
                        name="costo_envio"
                        value={formulario.costo_envio}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Descripción:
                    <textarea required
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <label>
                    Imagen:
                    <input
                        type="text"
                        name="imagen"
                        value={formulario.imagen}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Marca:
                    <input required
                        type="text"
                        name="marca"
                        value={formulario.marca}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Modelo:
                    <input required
                        type="text"
                        name="modelo"
                        value={formulario.modelo}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Precio:
                    <input required
                        type="number"
                        name="precio"
                        value={formulario.precio}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Categoría ID:
                    <input required
                        type="number"
                        name="categoria_id"
                        value={formulario.categoria_id}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Añadir Instrumento</button>
            </form>
        </div>
    );
};

export default AñadirInstrumento;
