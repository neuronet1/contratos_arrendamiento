var Emitter = require('events').EventEmitter;
var util = require('util');


// Al invocar a contratos debemos pasarle la base de datos
var Contratos = function (database, log) {
    var self = this;
    self.database = database;
    self.log = log;

    Emitter.call(self);


    // Al iniciar de consultar la lista de contratos
    var get_contratos_starting =  function () {
        if(self.log)
            console.log('@Iniciando la consulta sobre los contratos');
    };
    // Al finalizar de obtener la lista de contratos
    var get_contratos_finished =  function (docs) {
        if(self.log)
            console.log('@Finalizando la consulta sobre los contratos');
    };
    // Al finanlizar de obtener un determinado contrato
    var get_contrato_finished = function (doc) {
        if(self.log)
            console.log('@Finalizando la consulta sobre el contrato ' + doc._id);
    };
    // Al iniciar la consulta sobre un determinado contrato
    var get_contrato_starting = function (id) {
        if(self.log)
            console.log('@Iniciando la consulta sobre el contrato ' + id);
    };

    // Obtiene un determinado contrato
    self.get_contrato = function (id, next) {
        var find_id = new self.database.ObjectID(id);

        self.emit('get_contrato_starting', id);

        self.database.contratos.findOne({"_id":find_id}, function (err, doc) {
             if(err) {
                next(err);
            }
            self.emit('get_contrato_finished', doc);
            next(null, doc);
        });
    };

    // Obtiene la lista de contratos
    self.get_contratos = function (filters, next) {

        self.emit('get_contratos_starting');
        //self.database.contratos.find().toArray(function (err, contratos) {
        self.database.contratos.find().sort({'trabajador.nombre':1}).toArray(function (err, contratos) {
            if(err) {
                next(err);
            }

            self.emit('get_contratos_finished', contratos);
            next(null, contratos);
        });
    };

    // Actualiza la información del contrato
    self.update = function (data, next) {
        var find_id = new self.database.ObjectID(data._id);

        var doc = data.contrato;
        /*

        var operation = {
                "trabajador": {
                    "nombre": contrato.trabajador.nombre,
                    "ficha":  contrato.trabajador.ficha,
                    "nivel":  contrato.trabajador.nivel,
                    "profesion": contrato.trabajador.profesion,
                    "categoria": contrato.trabajador.categoria,
                    "puesto": contrato.trabajador.puesto
                },
                "casa": {
                    "status": contrato.casa.status,
                    "estado": contrato.casa.estado,
                    "colonia": contrato.casa.colonia,
                    "cp": contrato.casa.cp,
                    "parcela": contrato.casa.parcela,
                    "escritura": contrato.casa.escritura,
                    "casa": contrato.casa.casa
                },
                "empresa": {
                    "centro": contrato.empresa.centro,
                    "area": contrato.empresa.area
                }
        };
        */

        self.database.contratos.update({"_id":find_id},doc, function (err, updated) {
            if(err) {
                next(err);
            }
            else {
                next(null, updated);
            }
        });
    };



    // eventos
    self.on('get_contratos_starting', get_contratos_starting);
    self.on('get_contratos_finished', get_contratos_finished);
    self.on('get_contrato_starting', get_contrato_starting);
    self.on('get_contrato_finished', get_contrato_finished);

    return self;
};

util.inherits(Contratos, Emitter);
module.exports = Contratos;
