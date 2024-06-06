// src/components/Buttons/Buttons.tsx
import React from 'react';

interface ButtonProps {
  onVerDetalle: () => void;
  onAñadirAlCarrito: () => void;
}

const Buttons: React.FC<ButtonProps> = ({ onVerDetalle, onAñadirAlCarrito }) => {
  return (
    <div>
      <button onClick={onVerDetalle}>Ver Detalle</button>
      <button onClick={onAñadirAlCarrito}>Añadir al Carrito</button>
    </div>
  );
};

export default Buttons;
