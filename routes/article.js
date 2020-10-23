'use strict'

const multipart =  require('connect-multiparty')
const express = require('express'); 
const ArticleController = require('../controllers/article');

const router = express.Router();

// Configuracion de multipart - Middleware
const md_upload = multipart({ uploadDir: './upload/articles' });

// Rutas de prueba
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas utiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);

router.route('/article/:id')
    .get(ArticleController.getArticle)
    .put(ArticleController.update)
    .delete(ArticleController.delete);

router.post('/image-upload/:id', md_upload,ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;