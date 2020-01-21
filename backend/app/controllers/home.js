var Produto = require('../models/produto');

var homeController = {
   index: function(request, response, next) {
    Produto.todos(function(products) {
      response.render('index', {
          title: 'App com Nodejs e Express',
          products: products
      }); 
    })},
    
    produtos: function(request, response, next) {
        if (request.query.id) {
            Produto.buscar(request.query.id, function(produto) {
                if (produto == null) {
                    console.log("Produto não encontrado");
                    response.send({});
                }
                else {
                    response.send(produto);
                }
            });
        }
        else if (request.query.nome) {
            Produto.buscarPorNome(request.query.desc, function(produtos) {
                response.send(produtos);
            });
        }
        else {
            Produto.todos(function(produtos) {
                response.send(produtos);
            });
        }
    },

    alterar: function(request, response, next) {
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
      },

      alterar_produto: function(request, response, next) {
        var produto = new Produto();
        produto.description = request.body.desc;
        produto.amount = request.body.amount;
        produto.price = request.body.price;
      
        produto.salvar(function() {
          response.redirect('/');
        }, request.body.id);
      },

      excluir: function(request, response, next) {
        var produto = new Produto();
        produto.id = request.query.id;
      
        produto.excluir(function() {
          response.redirect('/');
        });
      },

      pesquisar: function(request, response, next) {
        Produto.buscarPorNome(request.query.desc, function(products) {    
          response.render('index', { 
            title: 'App com Nodejs e Express', products: products 
          });  
        });
      },

      cadastrar: function(request, response, next) {
        var produto = new Produto();
        
        produto.id =request.body.id;
        produto.description = request.body.desc;
        produto.amount = request.body.amount;
        produto.price = request.body.price;
      
        produto.salvar(function(products) {
            response.redirect("/");
        });
      },

      estados: function(request, response, next) {
        var estados = [
          {'PR' : 'Paraná'},
          {'RS' : 'Rio Grande do Sul'},
          {'SC' : 'Santa Catarina'}
        ];
      
        response.send(estados);
      },

      cidades: function(request, response, next) {
        var cidades_estado = [
          {'PR' : [
                    'Antonina',
                    'Curitiba',
                    'Morretes'
                  ]
          },
          {'RS' : [
                    'Bento Gonçalves',
                    'Erechin',
                    'Uruguaiana'
          ]},
          {'SC' : [
                    'Camboriú',
                    'Florianópolis',
                    'Itajaí'
          ]}        
        ];
      
        var  estado = request.query.estado;
      
        if (estado !== undefined && estado != "") {
          var cidades = [];
      
          for (var i = 0; i < cidades_estado.length; i++) {
            if (cidades_estado[i][estado] !== undefined) {
              cidades = cidades_estado[i][estado];
            }
          }
          
          if (cidades == []){
            cidades = cidades_estado;
          }
        
          response.send(cidades);
        }
        else {
          response.send([]);
        }
        
      }
};

module.exports = homeController;
