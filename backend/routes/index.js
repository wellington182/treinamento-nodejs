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
  dados = { title: 'Pesquisando no Banco'}
  load(function read(err, data) {    
    dados['products'] = [];

    if (err) {
      console.log(err);      
    }
    else {
      var dadosBanco = JSON.parse(data);
      var desc = request.query.desc;
      
      if (desc == "") {
        dados['products'] = dadosBanco;
      }
      else {          
        var regex = new RegExp(desc, "i");

        for (var i = 0; i < dadosBanco.length; i++) {
          descBanco = dadosBanco[i].description;
  
          if (descBanco.match(regex) !== null) {
            dados['products'].push(dadosBanco[i]);
          }
        }
      }
    }

    response.render('index', dados);  
  });
});

/* POST cadastro */
router.post('/cadastrar', function(request, response, next) {
  load(function read(err, data) {
    products = [];

    if (err) {
      console.log(err);

      return;
    }

    try {
      products = JSON.parse(data);
    }
    catch(e) {
      console.log(e);
    }

    var hash = {
      id: request.body.id,
      description: formatDesc(request.body.desc),
      amount: formatAmount(request.body.amount),
      price: formatValue(request.body.price)
    };
  
    save(hash);
    
    response.render('index', { title: 'Cadastro', products: products });    
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
  produto.description = request.query.id;

  produto.excluir(function(products) {
    response.redirect('/', {
        title: 'App com Nodejs e Express',
        products: products
    });
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
