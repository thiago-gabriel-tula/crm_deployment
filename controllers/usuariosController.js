const Usuarios = require('../models/Usuarios.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res, nex)=>{
    // Leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({msg: 'Hubo un error'});

    }
};


exports.autenticarUsuario = async (req, res, next)=>{


    // buscar el usuario por el registro
    const usuario = await Usuarios.findOne({email: req.body.email})

    if(!usuario){
        await res.status(401).json({msg: 'Ese usuario no existe'});
        next();
    }else {
        if(!bcrypt.compareSync(req.body.password, usuario.password)){
            // si el password es incorrecto
            await res.status(401).json({msg: 'Password incorrecto'});
            next();
        }else{
            // Password correcto, firmar token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA', {
                expiresIn: '1h'
            })

            res.json({token})
        }
    }
};