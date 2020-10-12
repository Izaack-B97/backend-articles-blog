'use strict'

const express = require('express'); 
const ArticleController = require('../controllers/article');

const router = express.Router();

// Rutas de prueba
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

// Rutas utiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);

module.exports = router;