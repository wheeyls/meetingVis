define(['backbone', 'timed-speech'], function (Backbone, TimedSpeech) {
  var times = Backbone.Collection.extend({
    model: TimedSpeech
  });

  return Backbone.Model.extend({
    speaking: false,

    initialize: function (name) {
      this.set({
        name: name,
        times: new Times()
      });
    },

    startSpeaking: function () {
      var current;
      if (this.speaking === true) { return; }

      this.current = this.times.create();

      this.speaking = true;
    },

    stopSpeaking: function () {
      if (this.speaking !== true) { return; }
      this.speaking = false;
      this.current.done();
    }
  });
});
