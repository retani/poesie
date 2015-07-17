Sessions = new Mongo.Collection('sessions');

var Schemas = {};

Schemas.Session = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional: true,
    },
    active: {
        type: Boolean,
        label: "Active",
    },
    selectionMode: {
        type: String,
        label: "Selection Mode",
        optional: true,
    },
    timingMode: {
        type: String,
        label: "Timing Mode",
        optional: true,
    },
    "createdAt": {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
    },
    history: {
        type: [Object],
        optional: true,
    },
    "history.$.poem": {
        type: String,
    },
    "history.$.startTime": {
        type: Date,
    },
    "history.$.endTime": {
        type: Date,
        optional: true
    },
    "history.$.mappings": {
        type: [String],
        optional: true
    },

});

Sessions.helpers({
  currentEntry: function() {
    return this.history[0]
  },
  isCurrent: function() {
    this == Sessions.current()
  },
  displayTitle: function() {
    if (this.title == null)
        return this._id
    else
        return this.title
  },
  currentPoem: function() {
    return Poems.findOne({ _id: this.history[0].poem });
  },
  newEntry: function (basePoem) {
    thisSession = this

    newPoem = {
      basePoem: basePoem._id,
      rootPoem: basePoem.rootPoem ? basePoem.rootPoem : basePoem._id,
      modificationDepth: basePoem.modificationDepth ? basePoem.modificationDepth + 1 : 1,
      author: basePoem.author, // it's not true, but makes things easier
      title: basePoem.title, // it's not true, but makes things easier
      lines: basePoem.lines,
    }

    Poems.insert(newPoem, function(err, id) {
      console.log(err)

      newEntry = {
        poem: id,
        startTime: Date.now()
      }
      Sessions.update({ _id: thisSession._id },{ $push: { history: { $each: [newEntry], $position:0 } }})
    })
  },
  next: function() {

    requestedNumberOfLines = Meteor.users.totalPlayers() == 0 ? 1 : Meteor.users.totalPlayers()
    possiblePoems = _.shuffle(Poems.find({ numberOfLines: requestedNumberOfLines }).fetch())

    basePoem = possiblePoems[0]

    //Meteor.users.totalPlayers()
    //console.log("old: " + this.currentPoem().title)
    Sessions.current().newEntry(basePoem)
    //console.log("new: " + this.currentPoem().title)
  }
});

Sessions.attachSchema(Schemas.Session);

Sessions.current = function () {
  return Sessions.findOne({
    active: true,
  });
}

if (Meteor.isServer) {
  Sessions.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  Sessions.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
