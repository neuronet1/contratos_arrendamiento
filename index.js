var Emitter = require('events').EventEmitter;
var util = require('util');


// Al invocar a contratos debemos pasarle la base de datos
var Contratos = function (database) {
    var self = this;
    self.database = database;

    Emitter.call(self);

    // Al finalizar de obtener la lista de contratos
    var get_contratos_finished =  function (data) {
        console.log('Finalizando get_contratos_finished');
    };

    // Obtiene la lista de contratos
    self.get_contratos = function (filters, next) {
        var data = {};

        self.database.contratos.find().toArray(function (err, docs) {
            self.emit('get_contratos_finished', data);
            next(docs);
        });
    };

    // cadena de eventos
    self.on('get_contratos_finished', get_contratos_finished);

    return self;

};

util.inherits(Contratos, Emitter);
module.exports = Contratos;
