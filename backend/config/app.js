mysql = require('mysql');
connectionString = 'mysql://root:prico182@localhost/loja';

db = {};
db.cnn = {};
db.cnn.exec = function(query, callback) {
    var connection = mysql.createConnection(connectionString);
    connection.query(query, function(err, rows) {
        callback(rows, err);
        connection.end();
    })
};

var App = {
        arquivoBD : 'dados/bd.js',
        db: db
}

module.exports = App;