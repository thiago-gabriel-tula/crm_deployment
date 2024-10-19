const Pedidos = require('../models/Pedidos.js')

// Crear Un nuevo Pedido
exports.nuevoPedido = async (req, res, next)=>{
    const pedido = new Pedidos(req.body);

    try{
        await pedido.save();

        res.json({msg: 'Pedido añadido'});

    } catch (error) {
        console.log(error);
        next()
    }
}


// Mostrar todos los pedidos
exports.mostrarPedidos = async (req, res, next)=>{
    const pedidos = await Pedidos.find({}).populate('cliente').populate({path: 'pedido.producto', model: 'Productos'}); // esto es para incluir otras bases de datos en la consulta

    try {
        res.json(pedidos);

    } catch (error) {
        console.log(error);
        next()
    }
}


//Mostrar un pedido en especifico
exports.mostrarPedido = async (req, res, next)=>{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({path: 'pedido.producto', model: 'Productos'});

    if(!pedido){
        res.json({msg: 'Peticion no válida'});
        return next();
    }

    // Mostrar el pedido
    res.json(pedido)
}


//Actualizar pedido por ID 
exports.actualizarPedido = async (req, res, next)=>{
    try{
        const pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {new: true});

        res.json(pedido);
    }catch (error) {
        console.log(error);
        return next();
    }
}


// Eliminar pedido por ID
exports.cancelarPedido = async (req, res, next)=>{

    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({msg: 'Pedido eliminado correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}