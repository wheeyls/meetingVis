define(['backbone'], function (Backbone) {
  var ticker = {};
  _.extend(ticker, Backbone.Events);
  window.setInterval(function () { ticker.trigger('tick'); }, 1000);

  return ticker;
});
