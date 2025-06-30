/**
 * Vamos a crear rutas del servidor
 * creamos un módulo por eso utilizamos express
 * vamos a utilizar como nuestra rest api para
 * enviar y recibir datos en formato json
 */
 const express = require('express');
 const router = express.Router();
 const productoCtrl = require('../controllers/productos.controller')


router.get('/', productoCtrl.getProductos);


router.post('/', productoCtrl.createProductos);


router.get('/:id', productoCtrl.getUnicoProducto);


router.put('/:id',productoCtrl.editarProducto);


router.delete('/:id', productoCtrl.eliminarProducto);


module.exports = router;

