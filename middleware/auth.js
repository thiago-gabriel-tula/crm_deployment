const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    // autorizacion por el header


    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    // obtener token
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // Si es un token valido pero hubo un error 
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}