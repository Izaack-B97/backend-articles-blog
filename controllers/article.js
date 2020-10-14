'use strict'

const validator = require('validator');
const Article = require('../models/article');
const { param } = require('../routes/article');

const controller = {
    datosCurso: (req, res) => {
        const params = req.body;

        res.json({
            curso: 'Master en frameworksjs',
            autor: 'Victor Robles', 
            url: 'victorrobleweb.es',
            params
        });
    },
    
    test: (req, res) => {
        res.json({
            message: 'Soy la accion de mi controlador de articulos'
        });
    }, 

    save: (req, res) => {
        const params = req.body;
        console.log(params)
        try {
            var validator_title = !validator.isEmpty(params.title);
            var validator_content = !validator.isEmpty(params.content);
        } catch (err) {
            res.status(200).json({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validator_content && validator_title) {
            let article = new Article();
            
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            article.save((err, articleStorage) => {
                if(err || !articleStorage) {
                    res.status(404).json({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                
                res.json({
                    status: 'success',
                    article
                });
            });

        } else {
            res.status(200).json({
                status: 'error',
                message: 'Los datos son incorrectos'
            });
        }
    },

    getArticles: (req, res) => {
        let query = Article.find();        
        let last = req.params.last;

        if (last || last != undefined ) {
            query.limit(5);
        }

        query.sort('-_id').exec((err, articles) => {
            if(err) {
                res.status(500).json({
                    status: 'error',
                    message: 'Error al devolver articulos'
                });
            }
            
            if(!articles) {
                res.status(404).json({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            res.status(200).json({
                status: 'success',
                articles
            });
        });
    }
};

module.exports = controller;