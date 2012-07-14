define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    initialize: function () {
      this.set({ start: new Date() });
    },

    done: function () {
      this.set({ stop: new Date() });
    }
  });
});
