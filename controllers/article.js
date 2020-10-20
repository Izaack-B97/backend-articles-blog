'use strict'

const validator = require('validator');
const Article = require('../models/article');  
const fs = require('fs');
const path =  require('path');

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
            // Elimina un fichero
            fs.unlink(file_path, (err) => {
                if(err) {
                    res.status(200).json({
                        status: 'error',
                        message: 'La extension de la imagen no es valida'
                    });
                }
            });

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
    },

    getArticle : (req, res) => {
        let id = req.params.id;
        
        if(!id || id == null) {
            res.status(404).json({
                status: 'error',
                message: 'No existe el articulo'
            });
        }        
        
        Article.findById(id, (err, article) => {

            if (!article || err) {
                res.status(404).json({
                    status: 'error',
                    message: ' No existe el articulo'
                });
            } else {
                res.status(202).json({
                    status: 'success',
                    article
                });    
            }
        });
    },
    
    update: (req, res) => {
        let params = req.body;
        let title = params.title, content = params.content;
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            res.status(200).json({
                status: 'error',
                message: 'Faltan datos por enviar !'
            });
        }

        if (validate_title && validate_content) {
                                                                    //devuelve ! el objeto actualizado
            Article.findOneAndUpdate({id: params.id }, params, {new: true},
                (err, articleUpdate) => {
                    if(err) {
                        res.status(500).json({
                            status: 'error',
                            message: 'Error al actualizar'
                        });
                    }

                    if (!articleUpdate) {
                        res.status(404).json({
                            status: 'error',
                            message: 'Articulo no encontrado',
                            articleUpdate
                        });
                    } 
                        
                    res.status(200).json({
                        status: 'success',
                        articleUpdate
                    });
                });
        } else {
            res.status(200).json({
                status: 'error',
                message: 'La validacion no es correcta !'
            });
        }
    },

    delete: (req, res) => {
        let id = req.params.id;

        Article.findOneAndDelete({_id: id }, (err, articleRemove) => {
            if(err) {
                res.status(500).json({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            
            if (!articleRemove) {
                res.status(404).json({
                    status: 'error',
                    message: 'No se pudo borrar el articulo, posiblemente no exista'
                });
            }

            res.status(200).json({
                status: 'success',
                articleRemove
            });
        });
    },
    
    upload: (req, res) => {
        let file_name = 'No se ha subido el archivo';
        let file =  req.files;

        console.log(file)

        if(!file) {
            res.status(404).json({
                status: 'error',
                message: 'No se ha cargado una imagen'
            });
        }

        let file_path = file.image.path;
        file_name = file_path.split('\\')[2];
        let file_ext = file_name.split('.')[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            let id  = req.params.id; 
            
            //Buscamos el archivo y le actualizamos el nombre de la imagen
            Article.findOneAndUpdate({_id: id}, { image: file_name }, { new: true }, (err, articleUpdate) => {
                // TODO: Reparar que no actualiza

                if (err || !articleUpdate) {
                    res.status(404).json({
                        status: 'error',
                        message: 'Error al actualizar, probablemente el articulo no exista'
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        articleUpdate
                    });
                }
            
            });
            
        } else {
            // Eliminanos el archivo que se guardo
            fs.unlink(file_path, (err) => {
                if(err) {
                    res.status(500).json({
                        status: 'error',
                        message: 'Error al borrar la imagen, la extension no es valida'
                    });        
                }
            });  

            res.status(404).json({
                status: 'error',
                message: 'El archivo no es una imagen'
            });
        }
    }
};

module.exports = controller;