const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


const clienteController = require('../controllers/clienteController.js');
const productosController = require('../controllers/productosControllers.js');
const pedidosController = require('../controllers/pedidosController.js');
const usuariosController = require('../controllers/usuariosController.js');

dotenv.config({ path: path.join(__dirname, '../.env')});

// Conectar a mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB)


// middleware para proteger ruta
const auth = require('../middleware/auth.js');

module.exports = function(){

    // ================================= CLIENTES ==============================================================

    // Agrega nuevos clientes
    router.post('/clientes', auth, clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes);

    // Muestra un cliente en especifico
    router.get('/clientes/:id', auth,  clienteController.mostrarCliente);

    // Actualizar cliente
    router.put('/clientes/:id', auth, clienteController.actualizarCliente);

    // Eliminar Cliente 
    router.delete('/clientes/:id', auth, clienteController.eliminarCliente);


    // ========================================== PRODUCTOS =================================================

    // Nuevos productos
    router.post('/productos', auth, productosController.subirArchivo, productosController.nuevoProducto);

    // Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos);

    // Muestra un producto en especifico
    router.get('/productos/:id', auth, productosController.mostrarProducto);

    // Actualizar producto
    router.put('/productos/:id', auth, productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar producto
    router.delete('/productos/:id', auth, productosController.eliminarProducto);

    // Busqueda de productos
    router.post('/productos/busqueda/:query', auth, productosController.buscarProducto)


    // ======================================== PEDIDOS =======================================================

    // Crear Un nuevo Pedido
    router.post('/pedidos', auth, pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    // Mostrar un pedido en especifico
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    // Actualizar pedido por ID
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    // Eliminar pedido por ID
    router.delete('/pedidos/:idPedido', auth, pedidosController.cancelarPedido);


    // =================================USUARIOS=========================

    router.post('/crear-cuenta', usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}



