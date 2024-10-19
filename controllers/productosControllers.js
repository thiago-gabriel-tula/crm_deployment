const Productos = require('../models/Productos.js');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
            cb(null, true)
        }else{
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configuracion el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube una archivo
exports.subirArchivo = (req, res, next)=>{
    upload(req, res, function(error){
        if(error){
            res.json({msg: error});
        }
        return next();
    })
}


// Nuevos productos
exports.nuevoProducto = async (req, res, next)=>{
    const producto = new Productos(req.body);

    try{
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({msg: 'Producto agregado correctamente'})
    }catch (error){
        console.log(error);
        next();
    }
}


// Muestra todos los productos
exports.mostrarProductos = async (req, res, next)=>{
    try {
        // Obtener todos los productos
        const productos = await Productos.find({});

        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un producto en especifico
exports.mostrarProducto = async (req, res, next)=>{
    const producto = await Productos.findById(req.params.id);

    if(!producto){
        res.json({msg: 'El producto no existe'});

        return next();
    }

    res.json(producto);
}


// Actualizar producto
exports.actualizarProducto = async (req, res, next)=>{
    try {

        let productoAnterior = await Productos.findById(req.params.id);

        // Construir un nuevo producto
        let nuevoProducto = req.body;

        // Verificar si hay imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.id}, nuevoProducto, {new: true});

        res.json(producto);

    } catch (error) {
        console.log(error);
        next();
    }
}


// Eliminar producto
exports.eliminarProducto = async (req, res, next)=>{
    try{
        await Productos.findOneAndDelete({_id: req.params.id});

        res.json({msg: 'El producto se ha eliminado'})
    }catch (error){
        console.log(error);
        next()
    }
}


// Busqueda de productos
exports.buscarProducto = async (req, res, next)=>{
    try{
        // Obtener el query;
        const {query} = req.params;

        const productos = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(productos);
    }catch (error) {
        console.log(error);
        next();
    }
}