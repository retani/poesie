/*****************************************************************************/
/* Play: Event Handlers */
/*****************************************************************************/
Template.Play.events({
  "change .line, keyup .line": function (event) {
    newLine = event.target.value

    var username = Meteor.user().username
    var mappings = Sessions.current().currentEntry().mappings
    var lineNumber = mappings.indexOf(username)
    var target = "lines." + lineNumber + ".text"
    var $set = {};
    $set[target] = newLine;
    console.log($set)
    Poems.update({ _id : Sessions.current().currentPoem()._id }, { $set: $set }, function (err, res) {
      console.log(err)
    })
  }
});

/*****************************************************************************/
/* Play: Helpers */
/*****************************************************************************/
Template.Play.helpers({
  line: function () {
    var username = Meteor.user().username
    var mappings = Sessions.current().currentEntry().mappings
    var lineNumber = mappings.indexOf(username)
    var line = Sessions.current().currentPoem().lines[lineNumber]
    return line.text
  }
});

/*****************************************************************************/
/* Play: Lifecycle Hooks */
/*****************************************************************************/
Template.Play.created = function () {
};

Template.Play.rendered = function () {
};

Template.Play.destroyed = function () {
};
