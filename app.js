'use strict'

// Modulos de node para crear sevidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express
const app = express();

// Variables de entono
app.set('port', process.env.PORT || 3000) ;

// Cargar Ficheros

// Middlewars
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// CORS

// Añadir prefijos a la rutas

// Ruta o metodo de prueba para el API REST
app.get('/', (req, res) => {
    res.send('Bienvenido a mi  API REST');
});

app.get('/probando', (req, res) => {
    res.json({
        curso: 'Master en frameworksjs',
        autor: 'Victor Robles', 
        url: 'victorrobleweb.es'
    });
});

// Exportar moduo (fichero actual)
module.exports = app;