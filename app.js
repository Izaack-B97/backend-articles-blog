'use strict'

// Modulos de node para crear sevidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express
const app = express();

// Variables de entono
app.set('port', process.env.PORT || 3000) ;

// Cargar Ficheros
const articleRoutes = require('./routes/article');

// Middlewars
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijos a la rutas/ Cargar rutas
app.use('/api', articleRoutes);

// Exportar moduo (fichero actual)
module.exports = app;