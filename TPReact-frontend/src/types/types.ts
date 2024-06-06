// src/components/types.ts
// src/types.ts
// src/types.ts
export interface UnidadMedida {
    id: number;
    denominacion: string;
  }
  
  export interface ArticuloInsumo {
    id: number;
    denominacion: string;
    precioVenta: number;
    unidadMedida: UnidadMedida;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    stockMinimo: number | null;
    esParaElaborar: boolean;
    habilitado: boolean;
    categoriaNombre: string | null;
    imagenes: string[];
  }
  
  export interface ArticuloManufacturadoDetalle {
    id: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
  }
  
  export interface Producto {
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoMinutos: number;
    precioVenta: number;
    preparacion: string;
    unidadMedida: UnidadMedida;
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[];
    habilitado: boolean;
    categoriaNombre: string | null;
    imagenes: string[];
    cantidad?: number; // Añadir esta línea
  }
  
  
  
  export interface ButtonProps {
    onClick: () => void;
    label: string;
  }
  