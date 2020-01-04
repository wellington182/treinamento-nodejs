var express = require('express');
var router = express.Router();

var Produto = require('../modelos/produto');
var App = require('../config/app');

/* GET home page. */
router.get('/', function(request, response, next) {
  Produto.todos(function(products) {
    response.render('index', {
        title: 'App com Nodejs e Express',
        products: products
    }); 
  });  
});

router.get('/pesquisar', function(request, response, next) {
  Produto.buscarPorNome(request.query.desc, function(products) {    
    response.render('index', { 
      title: 'App com Nodejs e Express', products: products 
    });  
  });
});

/* POST cadastro */
router.post('/cadastrar', function(request, response, next) {
  var produto = new Produto();
  
  produto.id =request.body.id;
  produto.description = request.body.desc;
  produto.amount = request.body.amount;
  produto.price = request.body.price;

  produto.salvar(function(products) {
      response.redirect("/");
  });
});

router.get('/alterar', function(request, response, next) {
  Produto.buscar(request.query.id, function(product) {
    if (product === null) {
      console.log("Produto não encontrado");

      response.render('product-error', { message: 'Usuário inválido' });
    }
    else {
      response.render('alterar', {
        title: 'Alteração de dados',
        products: product
      });
    }
  });
});

router.post('/alterar-product', function(request, response, next) {
  var produto = new Produto();
  produto.description = request.body.desc;
  produto.amount = request.body.amount;
  produto.price = request.body.price;

  produto.salvar(function() {
    response.redirect('/');
  }, request.body.id);
});

router.get('/excluir', function(request, response, next) {
  var produto = new Produto();
  produto.id = request.query.id;

  produto.excluir(function() {
    response.redirect('/');
  });
});
  
  /* Aux. Methods */
  function load(callback) {
    var fs = require('fs');
    fs.readFile(App.BD, callback);
  }

  function saveAll(products) {
    var fs = require('fs');
    fs.writeFile(App.BD, JSON.stringify(products), function(err) {
      if (err) {
          console.log(err);
      }              
    });
  }
  
  function save(hash) {
    products.push(hash);
    
    saveAll(products);
  }

function formatDesc(desc) {
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);

  return str;
}

function formatAmount(amount) {
  return parseInt(amount);
}

function formatValue(price) {
  var str = parseFloat(price).toFixed(2);
  str = "$" + str.toString().replace(".", ",");
  
  return str;
}

module.exports = router;
