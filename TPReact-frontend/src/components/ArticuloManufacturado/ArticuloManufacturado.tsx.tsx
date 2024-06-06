import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ArticuloManufacturado.css";
import { faTrashAlt, faEdit, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Definir las interfaces de tipos
interface Categoria {
  id: number;
  denominacion: string;
}

interface ArticuloManufacturado {
  id: number;
  denominacion: string;
  precio: number;
  costo_envio: string;
  cantidad_vendida: number;
  categoria: Categoria;
}

interface CarritoItem extends ArticuloManufacturado {
  cantidad: number;
}

interface ArticuloManufacturadoProps {
  carrito: CarritoItem[];
  setCarrito: React.Dispatch<React.SetStateAction<CarritoItem[]>>;
}

const ArticuloManufacturado: React.FC<ArticuloManufacturadoProps> = ({ carrito, setCarrito }) => {
  const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/ArticuloManufacturado")
      .then((response) => response.json())
      .then((data) => setArticulosManufacturados(data));

    fetch("http://localhost:8080/categoria")
      .then((response) => response.json())
      .then((data) => setCategorias(data));
  }, []);

  const handleClick = (articuloManufacturado: ArticuloManufacturado) => {
    const detalleUrl = `/detalle/${articuloManufacturado.id}`;
    navigate(detalleUrl);
  };

  const handleClickEditar = (id: number) => {
    const detalleUrl = `/editar/${id}`;
    navigate(detalleUrl);
  };

  const handleClickEliminar = (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este artículo manufacturado?");
    if (confirmacion) {
      fetch(`http://localhost:8080/manufacturados/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            setArticulosManufacturados(prevArticulosManufacturados => prevArticulosManufacturados.filter(item => item.id !== id));
          }
        })
        .catch(error => {
          console.error('Error al eliminar el artículo manufacturado:', error);
        });
    }
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleAñadirCarrito = (articuloManufacturado: ArticuloManufacturado) => {
    const existente = carrito.find(item => item.id === articuloManufacturado.id);
    if (existente) {
      setCarrito(carrito.map(item =>
        item.id === articuloManufacturado.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...articuloManufacturado, cantidad: 1 }]);
    }
  };

  const handleEliminarCarrito = (articuloManufacturado: ArticuloManufacturado) => {
    const existente = carrito.find(item => item.id === articuloManufacturado.id);
    if (existente) {
      if (existente.cantidad > 1) {
        setCarrito(carrito.map(item =>
          item.id === articuloManufacturado.id ? { ...item, cantidad: item.cantidad - 1 } : item
        ));
      } else {
        setCarrito(carrito.filter(item => item.id !== articuloManufacturado.id));
      }
    }
  };

  const filteredArticulosManufacturados = categoriaSeleccionada
    ? articulosManufacturados.filter(articuloManufacturado => articuloManufacturado.categoria && articuloManufacturado.categoria.denominacion === categoriaSeleccionada)
    : articulosManufacturados;

  return (
    <div className="articulosManufacturados-container">
      <div className="categoria-seleccion">
        <label>Seleccione una categoría:
          <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
            <option value="">Todos</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</option>
            ))}
          </select>
        </label>
      </div>
      {filteredArticulosManufacturados.map(articuloManufacturado => (
        <div key={articuloManufacturado.id} className="Articulo">
          <div className="detalles">
            <h2>{articuloManufacturado.denominacion}</h2>
            <p>{articuloManufacturado.precio}$</p>
            {articuloManufacturado.costo_envio === "G" ? (
              <p style={{ color: 'green' }}>Envío Gratis</p>
            ) : (
              <p style={{ color: '#007BA7' }}>El costo de envío es de: {articuloManufacturado.costo_envio}</p>
            )}
            <p>{articuloManufacturado.cantidad_vendida} vendidos</p>
            <div className="botones">
              <button onClick={() => handleClick(articuloManufacturado)} className="boton">Ir a Detalle</button>
              <button onClick={() => handleClickEditar(articuloManufacturado.id)} className="boton">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleClickEliminar(articuloManufacturado.id)} className="boton">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button onClick={() => handleAñadirCarrito(articuloManufacturado)} className="boton">
                <FontAwesomeIcon icon={faCartPlus} /> Añadir al Carrito
              </button>
              <button onClick={() => handleEliminarCarrito(articuloManufacturado)} className="boton">
                Eliminar del Carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticuloManufacturado;
