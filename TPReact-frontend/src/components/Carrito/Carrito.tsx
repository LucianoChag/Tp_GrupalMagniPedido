import React, { useState } from 'react';
import './Carrito.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PreferenceMP from '../../types/PreferenceMP';
import Pedido from '../../types/PedidoMP';
import { FaTimes } from 'react-icons/fa';
import { Producto } from '../../types/types';
import { Item } from 'react-bootstrap/lib/Breadcrumb';

// Enums para TipoEnvio y FormaPago
enum TipoEnvio {
  DELIVERY = 'DELIVERY',
  TAKE_AWAY = 'TAKE_AWAY'
}

enum FormaPago {
  EFECTIVO = 'EFECTIVO',
  MERCADO_PAGO = 'MERCADO_PAGO'
}

async function createPreferenceMP(pedido?: Pedido) {
  const urlServer = 'http://localhost:8080/pedido/api/create_preference_mp';
  const method: string = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  return await response.json() as PreferenceMP;
}

interface CarritoProps {
  carrito: Producto[];
  setCarrito: React.Dispatch<React.SetStateAction<Producto[]>>;
  toggleCarrito: () => void;
}

const Carrito: React.FC<CarritoProps> = ({ carrito, setCarrito, toggleCarrito }) => {
  const [idPreference, setIdPreference] = useState<string>('');
  const [formaPago, setFormaPago] = useState<FormaPago>(FormaPago.EFECTIVO);
  const [tipoEnvio, setTipoEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);
  const [loading, setLoading] = useState<boolean>(false);

  initMercadoPago('TEST-eb47d0f2-fe8e-45d7-9ff3-ec3171257875');

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precioVenta * item.cantidad, 0);
  };

  const calcularTotalCosto = () => {
    return calcularTotal() + 300;
  };

  const getPreferenceMP = async () => {
    setLoading(true);
    try {
      const response: PreferenceMP = await createPreferenceMP({
        id: 0,
        titulo: 'Pedido carrito instrumentos',
        montoTotal: calcularTotal()
      });
      console.log("Preference id: " + response.id);
      if (response) {
        setIdPreference(response.id);
      }
    } catch (error) {
      console.error('Error al crear la preferencia de Mercado Pago:', error);
      alert('Error al crear la preferencia de Mercado Pago');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarProducto = (id: number) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  const handleIncrementarCantidad = (id: number) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
  };

  const handleDecrementarCantidad = (id: number) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    setCarrito(nuevoCarrito);
  };

  const handleRealizarPedido = async () => {
    setLoading(true);
  
    try {
      const totalCosto = calcularTotalCosto();
      const horaEstimadaFinalizacion = new Date(Date.now() + 30 * 60 * 1000); // Sumar 30 minutos

      const pedido = {
        horaEstimadaFinalizacion: horaEstimadaFinalizacion.toTimeString().split(' ')[0],
        total: calcularTotal(),
        totalCosto: totalCosto,
        estado: 'PREPARACION',
        tipoEnvio: tipoEnvio,
        formaPago: formaPago,
        fechaPedido: new Date().toISOString().split('T')[0],
        detallePedidos: carrito.map(item => ({
          cantidad: item.cantidad,
          subTotal: item.precioVenta * item.cantidad,
          idArticulo: item.id,
        })),
      
      };


      const pedidoResponse = await fetch('http://localhost:8080/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (!pedidoResponse.ok) {
        console.error('Error al crear el pedido:', pedidoResponse.status, pedidoResponse.statusText);
        alert('Error al crear el pedido');
        return;
      }

      alert('Pedido realizado con éxito!');
      setCarrito([]);
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h2>Carrito de Compras</h2>
        <button onClick={toggleCarrito} className="close-carrito-button">
          <FaTimes />
        </button>
      </div>
      {loading ? (
        <p>Procesando...</p>
      ) : carrito.length === 0 ? (
        <p>Carrito Vacío</p>
      ) : (
        <div>
          {carrito.map(item => (
            <div key={item.id} className="carrito-item">
              <img src={"/img/" + item.imagenes} alt={item.denominacion} style={{ width: '100px' }} />
              <div className="detalles-item">
                <h3>{item.denominacion}</h3>
                <p>Precio: ${item.precioVenta}</p>
                <p>
                  Cantidad: 
                  <button onClick={() => handleDecrementarCantidad(item.id)}>-</button>
                  {item.cantidad}
                  <button onClick={() => handleIncrementarCantidad(item.id)}>+</button>
                </p>
                <p>Subtotal: ${item.precioVenta * item.cantidad}</p>
                <button onClick={() => handleEliminarProducto(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <h3>Total: ${calcularTotal()}</h3>
          <div className="select-container">
            <label>Forma de Pago:</label>
            <select value={formaPago} onChange={(e) => setFormaPago(e.target.value as FormaPago)}>
              <option value={FormaPago.EFECTIVO}>Efectivo</option>
              <option value={FormaPago.MERCADO_PAGO}>Mercado Pago</option>
            </select>
          </div>
          <div className="select-container">
            <label>Tipo de Envío:</label>
            <select value={tipoEnvio} onChange={(e) => setTipoEnvio(e.target.value as TipoEnvio)}>
              <option value={TipoEnvio.DELIVERY}>Delivery</option>
              <option value={TipoEnvio.TAKE_AWAY}>Take Away</option>
            </select>
          </div>
          {formaPago === FormaPago.MERCADO_PAGO && (
            <>
              <button onClick={getPreferenceMP}>Pagar con Mercado Pago</button>
              {idPreference && (
                <Wallet initialization={{ preferenceId: idPreference }} />
              )}
            </>
          )}
          <button onClick={handleRealizarPedido}>Realizar pedido</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
