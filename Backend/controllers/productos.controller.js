const Producto = require('../models/producto');
const productoCtrl = {};




productoCtrl.getProductos = async (req, res) => {
        const productos = await Producto.find();
        res.json(productos);
};


productoCtrl.createProductos = async (req, res) => {
  const producto = new Producto(req.body);
  await producto.save();
  res.json({ 'status': 'Producto guardado' });
}


productoCtrl.getUnicoProducto = async (req, res) => {
        const productoUnico = await Producto.findById(req.params.id);
        res.json(productoUnico);
};


productoCtrl.editarProducto = async (req, res) => {
const mongoose = require('mongoose');
  const id = new mongoose.Types.ObjectId(req.params.id);
  const productoEdit = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    stock: req.body.stock
  };
  await Producto.findByIdAndUpdate(id, { $set: productoEdit }, { new: true });
  res.json({ status: 'Producto Actualizado' });
}


productoCtrl.eliminarProducto = async (req, res) => {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({status: 'Producto Eliminado'});
};


module.exports = productoCtrl;
