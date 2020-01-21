var express = require('express');
var router = express.Router();

var homeController = require('../app/controllers/home');


/* GET home page. */
router.get('/', homeController.index);
router.get('/produtos.json', homeController.produtos);
router.get('/alterar', homeController.alterar);
router.get('/pesquisar', homeController.pesquisar);
router.post('/cadastrar', homeController.cadastrar);
router.get('/alterar', homeController.alterar);
router.post('/alterar-product', homeController.alterar_produto);
router.get('/excluir', homeController.excluir);
router.get('/estados.json', homeController.estados);
router.get('/cidades.json', homeController.cidades);

module.exports = router;
