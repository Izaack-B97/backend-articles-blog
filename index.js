'use strict'

const mongose = require('mongoose');
const chalk = require('chalk');
const app = require('./app.js');  

// Configuraciones
mongose.Promise = global.Promise;
mongose.set('useFindAndModify', false);

mongose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(resp => {
        console.log(chalk.green('CONECTADO A LA BASE DE DATOS'));

        app.listen(app.get('port'), () => {
            console.log('Server on port ' + app.get('port'))
        })

    })
    .catch(err => {
        console.log(chalk.red('ERROR AL CONECTAR LA BD: ' + err));
    });