var m = require('mongodb'),
    _ = require('underscore'),
    Q = require('q'),
    db_defer = Q.defer();
    //new m.Db( 'node-mongo-meetings', 
      //new m.Server("127.0.0.1", 27017, {auto_reconnect: true}));
    //db.open(function () {
    //});

var mongostr = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/node-mongo-meetings';

function connectIt() {
  m.connect(mongostr, {auto_reconnect: true}, function(error, db) {
    console.log('connected to db ' + mongostr);

    db.addListener("error", function (error) {
      console.log("Error connecting to MongoLab");
    });

    db_defer.resolve(db);
  });
}

connectIt();

exports.db = function (callback) {
  db_defer.promise.then(callback);
};
