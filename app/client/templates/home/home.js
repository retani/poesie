/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  "click .next": function () {
    Sessions.current().next()
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  currentSession: function() {
    return Sessions.current()
  },
  currentSessionLength: function() {
    if (Sessions.current().history)
      return Sessions.current().history.length
    else
      return 0
  },
  currentEntry: function() {
    return Sessions.current().currentEntry()
  },
  currentPoem: function() {
    return Sessions.current().currentPoem()
  },
  totalPlayers: function () {
    return Meteor.users.totalPlayers()
  },  
  totalPoems: function() {
    return Poems.find({rootPoem: null}).count();
  },
  totalSessions: function() {
    return Sessions.find().count();
  }  
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};
