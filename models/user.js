var _ = require('underscore'),
    db = require('./db.js').db;

var user = exports.user = function (attr) {
  var me = { }
    , attr = attr || {}
    ;

  me.save = function (callback) {
    callback = callback || function () {};

    db.collection("users", function (err, data) {
      data.insert(me.attributes, function(error, results) {
        callback(error, results);
      });
    })
  };

  me.find = function (id, callback) {
    callback = callback || function () {};

    db.collection("users", function (err, data) {
      var o_id = m.ObjectID.createFromHexString(id);
      data.findOne({_id: o_id}, function (err, result) {
        callback(result);
      });
    });
  };

  me.findByMeetingId = function (meetingId, callback) {
    callback = callback || function () {};

    db.collection("users", function (err, data) {
      data.find({meetingId: meetingId}).toArray(function (err, result) {
        callback(result);
      });
    });
  };

  me.attributes = _.extend({}, attr);
  return me;
};
