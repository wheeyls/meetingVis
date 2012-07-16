var fs = require("fs"),
    m = require('mongodb'),
    _ = require('underscore'),
    db = require('./db.js').db;

var meeting = exports.meeting = function (attr) {
  var me = { }
    , attr = attr || {}
    ;

  me.save = function (callback) {
    callback = callback || function () {};

    db.collection("meetings", function (err, data) {
      data.insert(me.attributes, function(error, results) {
        callback(error, results);
      });
    })
  };

  me.find = function (id, callback) {
    callback = callback || function () {};

    db.collection("meetings", function (err, data) {
      var o_id = m.ObjectID.createFromHexString(id);
      data.findOne({_id: o_id}, function (err, result) {
        callback(result);
      });
    });
  };

  me.attributes = _.extend({}, attr);

  return me;
};

/*
var Day = exports.Day = function day(attributes) {
  var i;
  for(i in attributes) { if(attributes.hasOwnProperty(i)) {
    this[i] = attributes[i];
  }}
};
Day.prototype = {
  start: 182.0,
  start_date: new Date("Mon Jan 14 2012 00:00:00 GMT-0800 (PST)"),
  daily_goal: (3/7),
  goal_weight: function (compare_date) {
    var ms_in_day = 24 * 60 * 60 * 1000,
      days_past = 0;
    compare_date = compare_date || this.attributes.date;

    days_past = Math.floor( (compare_date.getTime() - this.start_date.getTime()) / ms_in_day );

    return this.start - (days_past * this.daily_goal);
  }
};

// Collection of days
var Days = exports.Days = function Days() {
  this.db = new m.Db('node-mongo-weight', new m.Server("0.0.0.0", 27017, {auto_reconnect: true}));
  this.db.open(function () {});
  this.file = "db.json";
  this.encoding = "utf-8";
  this.list = {};
};
Days.prototype = {
  create: function(attributes, callback) {
    var d = new Day(attributes); 

    this.save(d, callback);
  },
  save: function(day, callback) {
    var that = this;
    that.db.collection("weights", function (err, data) {
      data.insert(day, function(error, results) {
        callback(error, results);
      });
    })
  },
  load: function(callback) {
    var all, list, i, that = this
    that.db.collection("weights", function (error, data) {
      if (error) {return;}
      data.find().toArray(function (error, results) {
        callback(error, results);
      });
    });
  }
};
*/
