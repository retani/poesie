Meteor.users.helpers({
})

Meteor.users.allPlayers = function () {
  return Meteor.users.find({ $and: [ {"status.online": true}, {"profile.route": "play"} ] })
}
Meteor.users.totalPlayers = function () {
  return Meteor.users.find({ $and: [ {"status.online": true}, {"profile.route": "play"} ] }).count();
}

