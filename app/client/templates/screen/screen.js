/*****************************************************************************/
/* Screen: Event Handlers */
/*****************************************************************************/
Template.Screen.events({
});

/*****************************************************************************/
/* Screen: Helpers */
/*****************************************************************************/
Template.Screen.helpers({
  poem: function () {
    return Sessions.current().currentPoem()
  },
  totalUsers: function () {
    console.log(Meteor.users.find({}))
    return Meteor.users.find({"status.online": true}).count()
  },
  allUsers: function () {
    return Meteor.users.find({})
  },
  allPlayers: function () {
    return Meteor.users.find({ $and: [ {"status.online": true}, {"profile.route": "play"} ] })
  },
  totalPlayers: function () {
    return Meteor.users.totalPlayers()
  }
});

/*****************************************************************************/
/* Screen: Lifecycle Hooks */
/*****************************************************************************/
Template.Screen.created = function () {
};

Template.Screen.rendered = function () {
  UserStatus.startMonitor({
    threshold: 15,
    interval: 10,
    idleOnBlur: false
  })
};

Template.Screen.destroyed = function () {
};
