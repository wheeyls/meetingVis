define(['backbone', 'speech-time', 'ticker'], function (Backbone, SpeechTime, ticker) {
  var SpeechTimeView = Backbone.View.extend({
    model: SpeechTime,
    initialize: function () {
      ticker.on('tick', this.render, this);
    },
    tagName: 'div',
    className: 'speech-time',
    scale: function (value) {
      return value/1000;
    },
    getStart: function () {
      var s = this.model.getStart(),
        theBeginning = this.meeting.getStartTime();

      return this.scale(s - theBeginning) + "px";
    },
    getWidth: function () {
      var s = this.model.getStart(),
          e = this.model.getStop() || new Date();

      return this.scale(e-s) + 'px';
    },
    getHeight: function () {
      return '15px';
    },
    render: function () {
      this.$el.html('&nbsp;');
      this.$el.css('width', this.getWidth());
      this.$el.css('height', this.getHeight());
      this.$el.css('left', this.getStart());
      return this;
    }
  });

  return SpeechTimeView;
});
