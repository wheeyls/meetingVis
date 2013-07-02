define(['backbone'], function (Backbone) {
  "use strict";

  var GridLine = Backbone.Model.extend({
    initialize: function (time) {
      this.set('time', time);
    }
  });

  return GridLine;
});
