const routes = require('./routes/routes.js');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({path: path.join(__dirname, './env')})

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors = require('cors');

// crear el servidor
const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Definir un dominio(s) para recibir las peticiones
const whileList = [process.env.FRONTEND_URL];
const corsOption = {
    origin: (origin, cb)=>{
        
        // revisar si la peticion viene de un servidor que está en la lista blanca
        const existe = whileList.some(dominio => dominio == origin);
        if(existe){
            cb(null, true)
        }else{
            cb(new Error('No permitido por CORS'))
        }
    } 
}


// Habilitar cors
app.use(cors(corsOption));

// Rutas de la app
app.use('/', routes());

// Carpeta publica
app.use(express.static(path.join(__dirname, './uploads')))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

// iniciar app
app.listen(port, host,  ()=>{
    console.log('el servidor esta funcionando');
})