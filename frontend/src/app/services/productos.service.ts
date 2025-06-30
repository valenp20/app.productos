import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../models/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  selectedProducto: Productos;
  productos: Productos[];

  readonly URL_API = 'http://localhost:3000/api/productos';
descripcion: any;

  constructor(private http: HttpClient) {
    this.selectedProducto = new Productos();
    this.productos = [];
  }

  // Métodos CRUD para productos

  getProductos() {
    return this.http.get<Productos[]>(this.URL_API);
  }

  postProducto(producto: Productos) {
    return this.http.post(this.URL_API, producto);
  }

  putProducto(producto: Productos) {
    return this.http.put(this.URL_API + `/${producto._id}`, producto);
  }

  deleteProducto(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}