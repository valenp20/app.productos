import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './productos.service';
import { Productos } from '../models/productos';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService]
    });
    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new producto (postProducto)', () => {
    const mockProducto: Productos = {
      _id: '1',
      nombre: 'Producto Test',
      descripcion: 'Descripción de prueba',
      precio: 100,
      name: 'Producto Test',
      categoria: 'Categoria Test',
      stock: 10
    } as Productos;

    service.postProducto(mockProducto).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(service.URL_API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProducto);
    req.flush({ success: true });
  });

  it('should get productos (getProductos)', () => {
    const mockProductos: Productos[] = [
      { _id: '1', nombre: 'Prod1', descripcion: '', precio: 10, name: 'Prod1', categoria: 'Cat1', stock: 5 } as Productos,
      { _id: '2', nombre: 'Prod2', descripcion: '', precio: 20, name: 'Prod2', categoria: 'Cat2', stock: 10 } as Productos
    ];

    service.getProductos().subscribe((productos) => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(mockProductos);
    });

    const req = httpMock.expectOne(service.URL_API);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('should update a producto (putProducto)', () => {
    const mockProducto: Productos = {
      _id: '1',
      nombre: 'Producto Actualizado',
      descripcion: 'Descripción actualizada',
      precio: 150,
      name: 'Producto Actualizado',
      categoria: 'Categoria Actualizada',
      stock: 20
    } as Productos;

    service.putProducto(mockProducto).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.URL_API}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProducto);
    req.flush({ success: true });
  });

  it('should delete a producto (deleteProducto)', () => {
    const productoId = '1';

    service.deleteProducto(productoId).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.URL_API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
