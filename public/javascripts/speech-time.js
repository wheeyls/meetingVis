define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    initialize: function () {
      !this.get('start') && this.set({ start: new Date() });
    },

    getStart: function () {
      var s = this.get('start');
      typeof s === 'string' && (s = new Date(s));

      return s;
    },

    getStop: function () {
      var s = this.get('stop');
      typeof s === 'string' && (s = new Date(s));

      return s;
    },

    done: function () {
      this.set({ stop: new Date() });
    }
  });
});
