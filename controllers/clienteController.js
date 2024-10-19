const Clientes = require('../models/Clientes.js');


// Agrega un nuevo cliente 
exports.nuevoCliente = async (req, res, next)=>{
    const cliente = new Clientes(req.body);

    try{

        // Almacenar el registro
        await cliente.save();

        res.json({msg: 'Se agrego un nuevo cliente'})
    } catch (error){
        // si hay un error, console.log y next
        res.send(error)
        next()
    }
}


// Muestra todos lod clientes
exports.mostrarClientes = async (req, res, next)=>{
    try {
        const clientes = await Clientes.find({});

        res.json(clientes)
    } catch (error) {
        console.log(error);
        next()
    }
}


// Muestra un cliente en especifico
exports.mostrarCliente = async (req, res, next)=>{
    const cliente = await Clientes.findById(req.params.id);

    if(!cliente){
        res.json({msg: 'Ese cliente no existe'});
        next()
    }

    // Mostrar cliente
    res.json(cliente)
}


// Actualizar cliente
exports.actualizarCliente = async (req, res, next)=>{
    try {
        const cliente = await Clientes.findOneAndUpdate({_id : req.params.id}, req.body, {new: true});

        res.json({msg: 'Se actualizó el cliente correctamente'})

    } catch (error) {
        res.send(error)
        next()
    }
}

// Eliminar cliente
exports.eliminarCliente = async (req, res, next)=>{
    try {
        await Clientes.findOneAndDelete({_id: req.params.id});

        res.json({msg: 'Cliente eliminado correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}