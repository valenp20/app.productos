import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductosComponent } from './productos.component';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../models/productos';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

(window as any).M = {
  toast: jasmine.createSpy('toast'),
};

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let productosService: ProductosService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ProductosService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService);
    fixture.detectChanges();
  });

  it('should crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería limpiar el formulario y restablecer selectedProducto al llamar a resetForm', () => {
    const formMock = {
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    component.resetForm(formMock);

    expect(formMock.reset).toHaveBeenCalled();
    expect(productosService.selectedProducto).toEqual(new Productos());
  });

  it('debería llamar a postProducto y resetear el formulario al guardar', () => {
    const formMock = {
      value: {
        nombre: 'Producto Test',
        descripcion: 'Descripción',
        precio: 100,
        name: 'Producto Test',
        categoria: 'Categoria Test',
        stock: 10,
      },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    spyOn(productosService, 'postProducto').and.returnValue(of({}));
    spyOn(component, 'resetForm');

    component.agregarProducto(formMock);

    expect(productosService.postProducto).toHaveBeenCalledWith(formMock.value);
    expect(component.resetForm).toHaveBeenCalledWith(formMock);
  });

  it('debería contener los campos de entrada requeridos en el formulario', () => {
    const nombreInput = fixture.debugElement.query(
      By.css('input[name="nombre"]')
    );
    const descripcionInput = fixture.debugElement.query(
      By.css('input[name="descripcion"]')
    );
    const precioInput = fixture.debugElement.query(
      By.css('input[name="precio"]')
    );
    const categoriaInput = fixture.debugElement.query(
      By.css('input[name="categoria"]')
    );
    const stockInput = fixture.debugElement.query(
      By.css('input[name="stock"]')
    );

    expect(nombreInput).toBeTruthy();
    expect(descripcionInput).toBeTruthy();
    expect(precioInput).toBeTruthy();
    expect(categoriaInput).toBeTruthy();
    expect(stockInput).toBeTruthy();
  });

  it('debería llamar a agregarProducto al enviar el formulario', () => {
    spyOn(component, 'agregarProducto');

   const formDebug = fixture.debugElement.query(By.css('form'));
    formDebug.triggerEventHandler('ngSubmit', null);

    expect(component.agregarProducto).toHaveBeenCalled();
  });
});