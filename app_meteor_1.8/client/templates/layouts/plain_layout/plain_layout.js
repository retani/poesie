Template.MasterLayout.helpers({
  currentRoute: function () {
    return Meteor.user().currentRoute
  }
});

Template.MasterLayout.events({
});
