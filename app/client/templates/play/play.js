/*****************************************************************************/
/* Play: Event Handlers */
/*****************************************************************************/
Template.Play.events({
  "change .line, keyup .line": function (event) {
    newLine = event.target.value

    if (!Sessions.current().currentPoem()) {
      console.warn("no current poem"); return;
    }

    var username = Meteor.user().username
    var mappings = Sessions.current().currentEntry().mappings
    var lineNumber = mappings.indexOf(username)
    var target = "lines." + lineNumber + ".text"
    var $set = {};
    $set[target] = newLine;
    console.log($set)
    Poems.update({ _id : Sessions.current().currentPoem()._id }, { $set: $set }, function (err, res) {
      if (err) 
        console.log(err)
      else
        Meteor.call('sessions/active/touch')
    })
  }
});

/*****************************************************************************/
/* Play: Helpers */
/*****************************************************************************/

Template.Play.helpers({
  hasLine: function() {
    var username = Meteor.user().username
    var mappings = Sessions.current().currentEntry().mappings
    var lineNumber = mappings.indexOf(username)
    return (lineNumber > -1)
  },
  waitText: function() {
    var countdown = Sessions.current().countdown
    return "[Please wait " + countdown + "s to join]"
  },
  line: function () {
    var username = Meteor.user().username
    var mappings = Sessions.current().currentEntry().mappings
    var lineNumber = mappings.indexOf(username)
    var line = Sessions.current().currentPoem().lines[lineNumber]
    return line.text
  },
  session: function () {
    return Sessions.current()
  },  
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
