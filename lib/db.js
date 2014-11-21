var mongodb = require('mongodb');
var BPromise = require('bluebird');
var ObjectID = require('mongodb').ObjectID;


module.exports = function (database) {
    var theDb = null;

    this.getDatabase = function () {
        var mongoUrl =  database.url + '/' + database.dbname;

        return new BPromise(function (resolve, reject) {
            if(!theDb) {
                mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                    if(err) {
                        reject(err);
                    }
                    else {
                        theDb = {
                            db: db,
                            contratos: db.collection('contratos'),
                            ObjectID: ObjectID
                        };
                        resolve(theDb);
                    }
                });
            }
            else {
                // ya tenemos creada la base, la pasamos a la funcion callback
                resolve(theDb);
            }
        });
    };

    return this;
};


