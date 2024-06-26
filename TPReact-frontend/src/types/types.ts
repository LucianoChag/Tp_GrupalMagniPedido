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
    imagen: string;
    cantidad?: number; // Añadir esta línea
  }
  
  export enum FormaPago {
    EFECTIVO = 'Efectivo',
    MERCADO_PAGO = 'Mercado Pago'
  }
  
  export enum TipoEnvio {
    DELIVERY = 'Delivery',
    TAKE_AWAY = 'Take Away'
  }
  
  export interface PreferenceMP {
    id: string;
    statusCode: number;
  }
  
  export interface ButtonProps {
    onClick: () => void;
    label: string;
  }
  