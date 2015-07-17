(function(){/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('poems', function (/* args */) {
  return Poems.find();
});

Meteor.publish('users', function (/* args */) {
  return Meteor.users.find({});
});

Meteor.publish('onlineUsers', function (/* args */) {
  return Meteor.users.find({"status.online": true});
});

Meteor.publish('players', function (/* args */) {
  return Meteor.users.find({ $and: [ {"status.online": true}, {"profile.route": "play"} ] });
});


Meteor.publish('sessions', function (/* args */) {
  return Sessions.find();
});

})();
