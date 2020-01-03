var App = require('../config/app');

function Produto() {
    this.id = 0;
    this.description = "";
    this.amount = 0;
    this.price = 0.0;

    this.salvar = function(callback, id) {
        var description = this.description;
        var amount = this.amount;
        var price = this.price;

        Produto.todos(function(products) {
            if (products == []) {
              console.log("Produto não encontrado");
            }
            else {
              for (var i = 0; i < products.length; i++) {
                if (products[i].id == id) {
                  products[i].description = description;
                  products[i].amount = amount;
                  products[i].price = price;
          
                  Produto.salvarTodos(products);
                  break;
                }
              }
            }
        
            callback.call(null, products)
          });
    };

    this.excluir = function(callback) {
        var id = this.id;

        Produtos.todos(function(products) {
            if (products == []) {
              console.log("Produto não encontrado");        
            }
            else {
              var productsNovos = [];

              for (var i = 0; i < products.length; i++) {
                if (products[i].id != id) {
                  productsNovos.push(products[i]);
                }
              }
              
              products = productsNovos;
              Produto.salvarTodos(productsNovos);
            }
        
            callback(null, products);        
        });
    };
}

Produto.buscar = function(id, callback) {
    Produto.todos(function(products) {
        var product = null;

        if (products == []) {
          console.log("Produto não encontrado");
        }
        else {    
            for (var i = 0; i < products.length; i++) {
              if (products[i].id === id) {
                product = products[i];
        
                break;
              }
            }
        }
    
    
        callback.call(null, product);
      });
};

Produto.todos = function(callback) {
    var fs = require('fs');
    fs.readFile(App.BD, function read(err, data) {    
      var products = [];

      if (err) {
        console.log(err);
        
      }
      else {
        try {
          products = JSON.parse(data);

        }
        catch(e) {
          console.log(e);
        }
      }
      
      callback.call(null, products);
  });
};

Produto.salvarTodos = function(products) {
    var fs = require('fs');
    fs.writeFile(App.BD, JSON.stringify(products), function(err) {
      if (err) {
          console.log(err);
      }              
    });
}

module.exports = Produto;