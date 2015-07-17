/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   * }
   */
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
    // id just came online
    //console.log(id)
  },
  removed: function(id) {
    // id just went offline
  }
});
