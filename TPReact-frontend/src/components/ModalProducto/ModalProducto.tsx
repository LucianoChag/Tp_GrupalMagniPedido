// src/components/ModalProducto/ModalProducto.tsx
import React from 'react';
import { Producto } from '../../types/types';
import './ModalProducto.css';

interface ModalProductoProps {
  producto: Producto | null;
  onClose: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ producto, onClose }) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{producto.denominacion}</h2>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Tiempo Estimado:</strong> {producto.tiempoEstimadoMinutos} minutos</p>
        <p><strong>Precio:</strong> ${producto.precioVenta}</p>
        <h3>Ingredientes:</h3>
        <ul>
          {producto.articuloManufacturadoDetalles.map(detalle => (
            <li key={detalle.id}>
              {detalle.articuloInsumo.denominacion} - {detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalProducto;
