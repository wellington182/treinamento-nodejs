var App = require('../../config/app');

function Produto() {
    this.id = 0;
    this.description = "";
    this.amount = 0;
    this.price = 0.0;

    this.salvar = function(callback, id) {
      var query = "";

      if (id === undefined) {
        query = "INSERT INTO loja.products(description, amount, price)" +
                "VALUES('" + this.description + "', " + this.amount + ", " + this.price + ")";
      }
      else {
        query = "UPDATE loja.products SET description = '" + this.description + "', amount = " + this.amount + ", price = " + this.price + " WHERE id = " + id;
      }
      
      App.db.cnn.exec(query, function(rows, err) {
        if (err) {
          console.log("Erro ao executar a query( " + query + " )");
        }
  
        callback.call();
      });          
    };

    this.excluir = function(callback) {
      var query = "DELETE FROM loja.products WHERE id = " + this.id;

      App.db.cnn.exec(query, function(rows, err) {
        if (err) {
          console.log("Erro ao executar a query( " + query + " )");
        }
  
        callback.call();
      });
    };
}

Produto.buscar = function(id, callback) {
  var query = "SELECT * FROM loja.products WHERE id = " + id;   

  App.db.cnn.exec(query, function(rows, err) {      
      if (err) {
        console.log("Erro ao executar a query( " + query + " )");
        callback.call(null, []);
      }
      else {
        if (rows.length > 0) {
          callback.call(null, rows[0]);
        }
        else {
          callback.call(null, null);
        }
      }
  });      
};

Produto.buscarPorNome = function(desc, callback) {
  var query = "SELECT * FROM loja.products WHERE description LIKE '%" + desc + "%'";   

  App.db.cnn.exec(query, function(rows, err) {
      if (err) {
        console.log("Erro ao executar a query( " + query + " )");
        callback.call(null, []);
      }
      else {
        callback.call(null, rows);
      }
  });  
};

Produto.todos = function(callback) {
  var query = "SELECT * FROM loja.products";   

  App.db.cnn.exec(query, function(rows, err) {
      if (err) {
        console.log("Erro ao executar a query( " + query + " )");
        callback.call(null, []);
      }
      else {
        callback.call(null, rows);
      }
  });
};

module.exports = Produto;