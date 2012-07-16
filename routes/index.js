/*
 * GET home page.
 */
var meeting = require('../models/meeting.js').meeting,
    user = require('../models/user.js').user,
    Q = require('q');

exports.index = function(req, res){
  res.render('index');
};

exports.show = function (req, res) {
  res.render('show', {meeting_id: req.params._id});
};

exports.get_meeting = function (req, res) {
  var the_meeting = meeting();

  the_meeting.find(req.params._id, function (data) {
    res.json(data);
  });
};

exports.create_meeting = function (req, res) {
  var new_meeting = meeting(req.body);
  new_meeting.save(function (err, result) {
    if (err) {
      res.json({err: err, result: result});
    } else {
      res.json(result);
    }
  });
};

exports.create_users = function (req, res) {
  var mid = req.params.meetingId, curr, promises = [], defer;

  req.body.forEach(function (ea) {
    defer = Q.defer();

    ea.meetingId = mid;
    curr = user(ea);
    curr.save(function () {
      defer.resolve();
    });

    promises.push(defer);
  });

  Q.all(promises).then(function () {
    res.json({msg: 'Users Created'});
  });
}

exports.get_users = function (req, res) {
  var users = user();
  users.findByMeetingId(req.params.meetingId, function (data) {
    res.json(data);
  });
}
