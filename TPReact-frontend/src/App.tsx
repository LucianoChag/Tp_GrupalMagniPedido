import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar/NavBar";
import './components/NavBar/NavBar.css';
import Detalle from "./components/Detalle/Detalle";
import AñadirInstrumento from "./components/AñadirInstrumento/AñadirInstrumento";
import Carrito from "./components/Carrito/Carrito";
import VistaProducto from './components/VistaProducto/VistaProducto'; // Importar el nuevo componente
import './components/Carrito/Carrito.css';
import './App.css';
import { Producto } from './types/types'; // Importar el tipo Producto

function App() {
  const [carrito, setCarrito] = useState<Producto[]>([]); // Usar el tipo Producto
  const [carritoVisible, setCarritoVisible] = useState(false);

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar toggleCarrito={toggleCarrito} carritoVisible={carritoVisible} />
        <div className={`content-container ${carritoVisible ? 'with-carrito' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/VistaProducto" />} />  {/* Redirigir a /VistaProducto por defecto */}
            <Route path="/VistaProducto" element={<VistaProducto carrito={carrito} setCarrito={setCarrito} />} />
            <Route path='/Detalle/:id' element={<Detalle />} />
            <Route path='/Añadir' element={<AñadirInstrumento />} />
          </Routes>
        </div>
        {carritoVisible && (
          <div className="carrito-container">
            <Carrito carrito={carrito} setCarrito={setCarrito} toggleCarrito={toggleCarrito} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
