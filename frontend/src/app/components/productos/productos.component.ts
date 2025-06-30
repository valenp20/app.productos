import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from './../../services/productos.service';
import { Productos } from './../../models/productos';

declare var M: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
   standalone: false,
})
export class ProductosComponent implements OnInit {
  constructor(public productosService: ProductosService) {}

  ngOnInit(): void {}

  agregarProducto(form?: NgForm) {
    if (form) {
      this.productosService.postProducto(form.value)
        .subscribe((res) => {
          this.resetForm(form);
          M.toast({ html: 'Guardado satisfactoriamente' });
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productosService.selectedProducto = new Productos();
    }
  }
}