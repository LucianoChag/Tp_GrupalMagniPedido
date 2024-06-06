// src/components/VistaProducto/VistaProducto.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Producto } from '../../types/types';
import TablaGenerica from '../TablaGenerica/TablaGenerica';
import SearchBar from '../SearchBar/SearchBar';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import ModalProducto from '../ModalProducto/ModalProducto';

interface VistaProductoProps {
  carrito: Producto[];
  setCarrito: React.Dispatch<React.SetStateAction<Producto[]>>;
}

const VistaProducto: React.FC<VistaProductoProps> = ({ carrito, setCarrito }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  useEffect(() => {
    axios.get<Producto[]>('http://localhost:8080/ArticuloManufacturado')
      .then(response => {
        const productosConCantidad = response.data.map(producto => ({ ...producto, cantidad: 1 }));
        setProductos(productosConCantidad);

        const categoriasUnicas = Array.from(new Set(response.data.map(producto => producto.categoriaNombre)));
        setCategories(categoriasUnicas);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleVerDetalle = (id: number) => {
    const producto = productos.find(p => p.id === id);
    setProductoSeleccionado(producto || null);
  };

  const handleCerrarModal = () => {
    setProductoSeleccionado(null);
  };

  const handleAñadirAlCarrito = (id: number, cantidad: number) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const productoEnCarrito = carrito.find(p => p.id === id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        setCarrito([...carrito]);
      } else {
        const productoConCantidad = { ...producto, cantidad };
        setCarrito([...carrito, productoConCantidad]);
      }
    }
  };

  const handleCantidadChange = (id: number, cantidad: number) => {
    const updatedProductos = productos.map(producto =>
      producto.id === id ? { ...producto, cantidad } : producto
    );
    setProductos(updatedProductos);
  };

  const filteredProductos = productos.filter(producto => {
    return (
      producto.denominacion.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || producto.categoriaNombre === selectedCategory)
    );
  });

  return (
    <div>
      <h2>Lista de Productos</h2>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={categories} />
      <TablaGenerica
        productos={filteredProductos}
        onVerDetalle={handleVerDetalle}
        onAñadirAlCarrito={handleAñadirAlCarrito}
        onCantidadChange={handleCantidadChange}
      />
      {productoSeleccionado && (
        <ModalProducto producto={productoSeleccionado} onClose={handleCerrarModal} />
      )}
    </div>
  );
};

export default VistaProducto;
