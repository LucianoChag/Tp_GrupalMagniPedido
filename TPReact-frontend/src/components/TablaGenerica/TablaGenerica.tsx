// src/components/TablaGenerica/TablaGenerica.tsx
import React from 'react';
import { Producto } from '../../types/types';
import Buttons from '../Buttons/Buttons';
import './TablaGenerica.css';

interface TablaGenericaProps {
  productos: Producto[];
  onVerDetalle: (id: number) => void;
  onAñadirAlCarrito: (id: number, cantidad: number) => void;
  onCantidadChange: (id: number, cantidad: number) => void;
}

const TablaGenerica: React.FC<TablaGenericaProps> = ({ productos, onVerDetalle, onAñadirAlCarrito, onCantidadChange }) => {
  const handleDecrement = (id: number, cantidad: number) => {
    if (cantidad > 1) {
      onCantidadChange(id, cantidad - 1);
    }
  };

  const handleIncrement = (id: number, cantidad: number) => {
    onCantidadChange(id, cantidad + 1);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(producto => (
          <tr key={producto.id}>
            <td>{producto.denominacion}</td>
            <td>{producto.precioVenta}</td>
            <td>{producto.categoriaNombre}</td>
            <td>
              <button onClick={() => handleDecrement(producto.id, producto.cantidad || 1)}>-</button>
              <span>{producto.cantidad || 1}</span>
              <button onClick={() => handleIncrement(producto.id, producto.cantidad || 1)}>+</button>
            </td>
            <td>
              <Buttons
                onVerDetalle={() => onVerDetalle(producto.id)}
                onAñadirAlCarrito={() => onAñadirAlCarrito(producto.id, producto.cantidad || 1)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaGenerica;
