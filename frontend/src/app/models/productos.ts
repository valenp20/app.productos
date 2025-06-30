export class Productos {
name: any;
    constructor(
        _id =' ',
        nombre = ' ',
        descripcion = ' ',
        categoria = ' ',
        stock = 0){

        this._id = _id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.stock = stock;
        }

_id: string;
nombre: string;
descripcion: string;
categoria: string;
stock: number;

 }