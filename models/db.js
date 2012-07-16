var m = require('mongodb'),
    _ = require('underscore'),
    db = new m.Db( 'node-mongo-meetings', 
      new m.Server("127.0.0.1", 27017, {auto_reconnect: true}));
    db.open(function () {
    });

exports.db = db;
