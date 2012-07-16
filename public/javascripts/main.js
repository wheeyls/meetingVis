require([
  'jquery', 
  'backbone', 
  'user', 
  'speech-time',
  'speech-time-view',
  'ticker'
  ], function ($, Backbone, User, SpeechTime, SpeechTimeView, ticker) {
  var Users
    , UserView
    , Meeting
    , meeting
    , MeetingView
    , appview
    ;

  Users = window.Users = Backbone.Collection.extend({
    initialize: function () {
      this.on('reset', this.rebuildTimes, this);
    },
    model: User,
    url: function () {
      var mid = this.meetingId;
      return '/meeting/' + mid + '/users';
    },
    save: function () {
      var response = Backbone.sync('create', this, { 
        url: this.url(), 
        contentType: 'application/json', 
        data: JSON.stringify(this.toJSON()) 
      });

      return response;
    },
    rebuildTimes: function (users) {
      users.each(function (u) {
        var myTimes = u.get('times');
        myTimes.each(function (t) {
        });
      });
    }
  });


  UserView = Backbone.View.extend({
    model: User,
    initialize: function (opts) {
      var times = this.model.get('times'), that = this;

      times && this.on('after-render', function () {
        that.addMany(times);
      })

      times.on('add', this.addOne, this);

      this.model.set('choice', opts.choice);
      this.model.on('change', this.updateSpeaking, this);
    },
    events: {
      'click': 'toggleSpeak'
    },
    tagName: 'li',
    className: 'user-view',
    template: _.template($('#user-template').html()),
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.trigger('after-render');
      return this;
    },
    toggleSpeak: function () {
      var timelineView;
      if (meeting.get('done')) {return;}
      this.model.toggle();
    },
    updateSpeaking: function () {
      var method = this.model.get('speaking') ? 'addClass' : 'removeClass';
      this.$el[method]('speaking');
    },
    addOne: function (time) {
      var view = new SpeechTimeView({ model: time });
      view.meeting = meeting;
      this.$el.find('.timeline').append(view.render().$el);
    },
    addMany: function (objs) {
      var that = this;
      objs.forEach(function (obj) {
        that.addOne(obj);
      });
    }
  });

  Meeting = Backbone.Model.extend({
    defaults: {
      done: false
    },
    initialize: function () {
      this.users = new Users();
      this.users.meetingId = this.id;
      this.set('title', new Date().toDateString());

      !this.get('start') && this.set('start', null);
    },
    getStartTime: function () {
      var s = this.get('start') || this.set('start', new Date());
      return new Date(this.get('start'));
    },
    getStopTime: function() {
      var s = this.get('stop') || new Date();
      return new Date(s);
    },
    getTotalTime: function () {
      if (!this.get('start')) {
        return 0;
      }
      return this.getStopTime() - this.getStartTime();
    },
    endMeeting: function () {
      this.set('done', true);
      this.set('stop', new Date());
    },
    urlRoot: '/meeting'
  });

  meeting = new Meeting({id: $('#the-app').data('meeting-id')});
  window.meeting = meeting;

  MeetingView = Backbone.View.extend({
    el: $('#the-app'),

    initialize: function () {
      var that = this;
      this.model.users.on('add', this.addOne, this);
      this.model.users.on('reset', this.addMany, this);
      $('.meeting-title').html(this.model.get('title'));

      $(document).on('keydown', function (e) {
        that.selectUser.call(that, e);
      });

      ticker.on('tick', this.showTime, this);
      this.showTime();
    },

    showTime: function () {
      var time = this.model.getTotalTime(),
          minutes = Math.floor(time / 1000 / 60),
          timeString = (time !== 0 && minutes < 1) ? '< 1' : minutes;
      $('#the-time').html(timeString + " Minute Meeting");
    },

    events: {
      'click #add-user': 'newUser',
      'click #end-meeting': 'endMeeting',
      'keypress #user-name-input': 'newOnEnter'
    },

    selectUser: function (e) {
      if(this.model.get('done')) { return; }

      if(e.ctrlKey) {
        var theIndex = e.keyCode - 49,
            theUser = this.model.users.at(theIndex);

        theUser && theUser.toggle();
      }
    },

    newOnEnter: function (e) {
      if (e.keyCode == 13) { this.newUser(); }
    },

    newUser: function () {
      var $name = $('#user-name-input'), view;

      if (!$name.val()) {
        $name.focus();
        return;
      }

      this.model.users.add({name: $name.val()});
      $name.val('');
    },

    endMeeting: function () {
      var that = this;
      if(confirm('End the meeting?')) {
        that.model.endMeeting();

        that.model.save().done(function (data) {
          that.model.users.meetingId = data[0]._id
          that.model.users.save();
          $('.meeting-text').html('Share this link to view this meeting:');
          $('#show-meeting').html(
            '<a href="/show/' + data[0]._id + '">' +
            document.location.origin + '/show/' + data[0]._id +
            '</a>'
          );
        });
      }
    },

    addOne: function (user) {
      var view = new UserView({model: user, choice: this.model.users.length});
      $('#the-list').append(view.render().el);
    },

    addMany: function (users) {
      var that = this;
      users.forEach(function (user) {
        that.addOne(user);
      });
    },


    successfulSave: function (data) {
      $('#the-list').append('<li>Got it!</li>');
    }
  });

  if (meeting.id) {
    meeting.fetch().then(function() {
      meeting.users.fetch();
      appview = new MeetingView({ model: meeting });
    });
  } else {
    appview = new MeetingView({ model: meeting });
  }
});
