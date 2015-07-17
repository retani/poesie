(function(){Poems = new Mongo.Collection('poems');

var Schemas = {};

Schemas.Poem = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author"
    },
    createdAt: {
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
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },

    /*
    poemID: {
      type: String,
      index: true,
      unique: true,
      autoValue: function(doc) {
        var seed = this.field("title");
        return
      }
    }
    */

    lines: {
        type: [Object]
    },
    "lines.$.text": {
        type: String,
        autoform: {
         afFieldInput: {
           //type: 'contenteditable'
         }
       }
    },
    "lines.$.styles": {
        type: [String],
        optional: true,
        autoform: {
          afFieldInput: {
            multiple: true,
            options: {"opts":"o","b":"c"}
          }
        }
    },

});

Poems.attachSchema(Schemas.Poem);

if (Meteor.isServer) {
  Poems.allow({
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

  Poems.deny({
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

})();
