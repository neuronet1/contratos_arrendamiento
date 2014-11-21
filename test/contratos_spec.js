var should = require('should');
var assert = require('assert');
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
                contratos = new Contratos(database,false);
                done();
            }).
            catch(function (err) {
                console.log('Imposible conectarse a la base de datos');
            });
    });

    it('Debe listar los contratos', function () {

        contratos.get_contratos({}, function (err, docs) {

            assert.ifError(err);

            var l = docs.length;

            // Debe ser un arreglo
            docs.should.be.instanceof(Array);

            // Debe por lo menos tener un elemento
            l.should.be.greaterThan(1);
        });
    });

    it('Debe obtener la información de un contrato', function () {
        contratos.get_contrato('5464f378218d3e9521175c47', function (err, doc) {
            assert.ifError(err);

            //doc no debe ser nulo
            var x = doc.should.be.ok;

            // debe tener la propiedad trabajador
            doc.should.have.property('trabajador');
        });
    });
});
