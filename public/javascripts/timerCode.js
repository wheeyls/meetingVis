define(['jquery'], (function ($) {
  var current = null
    , me = {times: {}}
    ;

  me.startTimer = function (name) {
    me.times[name] = me.times[name] || {start: [], end: []};
    me.times[name].start.push(new Date());
    me.times[current] && (me.times[current].end.push(new Date()));
    current = name;
  }

  me.endTimer = function () {
    current && (me.times[current] = me.times[current] || {start: [], end: []});
    me.times[current].end.push(new Date());
    current = null;
  }

  me.save = function (filename) {
    $.post('/create', JSON.stringify(me.times), console.log);
  };

  return me;
});
