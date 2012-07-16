define(['backbone', 'speech-time', 'speech-time-view'], function (Backbone, SpeechTime, SpeechTimeView) {
  var SpeechTimes = Backbone.Collection.extend({
    model: SpeechTime,
    initialize: function (models) {
      var that = this;
      if (_(models).isArray()) {
        _(models).forEach(function (m) {
          that.add(m);
        });
      }
    },
    toggle: function () {
    },
    startSpeaking: function () {
      this.add();
    },
    stopSpeaking: function () {
      this.last().done();
    }
  });


  return Backbone.Model.extend({
    initialize: function () {
      var t = new SpeechTimes(this.get('times'));

      this.set('times', t);
      this.set('speaking', false);
    },

    toggle: function () {
      this.get('speaking') ? this.shaddup() : this.speak();
    },

    speak: function () {
      var current, view;
      if (this.get('speaking') === true) { return; }
      this.get('times').startSpeaking();
      this.set('speaking', true);
    },

    shaddup: function () {
      if (this.get('speaking') !== true) { return; }
      this.set('speaking', false);
      this.get('times').stopSpeaking();
    }
  });
});
