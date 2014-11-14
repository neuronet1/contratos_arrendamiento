var should = require('should');
var Database = require('../lib/db.js');
var Contratos = require('../index.js');

describe('Contratos', function () {

    var configdb = {
        url: 'mongodb://localhost:27017',
        dbname: 'casas_pemex'
    };
    var database = null;
    var contratos = null;

    before(function (done) {
        new Database(configdb).getDatabase().
            then(function (db) {
                database = db;
                console.log('Obteniendo la base de datos');
                contratos = new Contratos(database);
                done();
            }).
            catch(function (err) {
                console.log('Imposible conectarse a la base de datos');
            });
    });

    it('Debe listar los contratos', function () {

        contratos.get_contratos({}, function (docs) {
            var l = docs.length;

            // Debe ser un arreglo
            docs.should.be.instanceof(Array);

            // Debe por lo menos tener un elemento
            l.should.be.greaterThan(1);
        });

    });





});
