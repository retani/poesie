/*****************************************************************************/
/* Sessions: Event Handlers */
/*****************************************************************************/
Template.Sessions.events({
});

/*****************************************************************************/
/* Sessions: Helpers */
/*****************************************************************************/
Template.Sessions.helpers({
  sessions: function () {
    Sessions.find({}, {sort: [["createdAt","desc"]]}).forEach(function (item) {
      console.log(item.isCurrent())
    });
    return Sessions.find({}, {sort: [["createdAt","desc"]]});
  }
});

/*****************************************************************************/
/* Sessions: Lifecycle Hooks */
/*****************************************************************************/
Template.Sessions.created = function () {
};

Template.Sessions.rendered = function () {
};

Template.Sessions.destroyed = function () {
};
