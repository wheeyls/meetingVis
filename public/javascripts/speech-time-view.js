define(['backbone', 'speech-time', 'ticker'],
  function (Backbone, SpeechTime, ticker) {
  var SpeechTimeView = Backbone.View.extend({
    model: SpeechTime,
    initialize: function () {
      ticker.on('tick', this.render, this);
    },
    tagName: 'div',
    className: 'speech-time',
    getStart: function () {
      var s = this.model.getStart(),
        theBeginning = this.meeting.getStartTime();

      return this.meeting.scale(s - theBeginning) + "%";
    },
    getWidth: function () {
      var s = this.model.getStart(),
          e = this.model.getStop() || new Date();

      return this.meeting.scale(e-s) + '%';
    },
    getHeight: function () {
      return '15px';
    },
    render: function () {
      var w = this.getWidth();
      this.$el.html('&nbsp;');
      this.$el.css('width', w);
      this.$el.css('height', this.getHeight());
      this.$el.css('left', this.getStart());
      return this;
    }
  });

  return SpeechTimeView;
});
