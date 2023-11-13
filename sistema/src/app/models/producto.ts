export class Producto {

    _id?: string;
    producto: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    imagen?: File; // Agrega este campo

    constructor(producto:string, categoria:string, ubicacion: string, precio: number, imagen?: File){
        this.producto = producto;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.imagen = imagen; // Y este
    }

}
