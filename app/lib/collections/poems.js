Poems = new Mongo.Collection('poems');

var Schemas = {};

Schemas.Poem = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional:true
    },
    author: {
        type: String,
        label: "Author",
        optional: true,
        custom: function() {
          if(this.field("rootPoem") == null) {
            return 'required';
          }
        },
        autoform: {
          type: "typeahead",
          afFieldInput: {
            typeaheadOptions: {
              /*minLength: 3*/
            },
            typeaheadDatasets: {
              source: function(query, process) {
                list = []
                poems = Poems.find({}, {fields: {'author':1}}).fetch()
                
                poems.forEach(function(item,i) {
                  if (list.indexOf(item.author) < 0)
                    list.push(item.author)
                })

                output = list.map(function(item){
                  return {
                    label:item,
                    value:item
                  }
                })                
                console.log(output)
                process(output)
              }
            }
          }
        }        
    },
    language: {
      type: [String],
      optional: true,
      autoform: {
        afFieldInput: {
          multiple: true,
          options: {"en":"English", "de":"Deutsch"}
        }
      }      
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


    year: {
      type: String,
      optional: true,
      label: "Year"
    },

    reference: {
      type: String,
      optional: true,
      label: "Reference"
    },

    
    numberOfLines: {
      type: Number,
      label: "No. of lines",
      defaultValue: 0,
      optional: true,
      autoValue: function() {
        if (this.isUpdate || this.isInsert) {
          var count = this.field("lines").value.length;
          console.log("no. of lines: " + count)
          return count
        }
      }
    },
    
    basePoem: {
      type: String,
      optional: true,
      label: "Base Poem"
    },

    rootPoem: {
      type: String,
      optional: true,
      label: "Root Poem"
    },

    modificationDepth: {
      type: Number,
      optional: true,
      label: "modification Depth"
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
            options: {"paragraph":"paragraph", "":"- none -"}
          }
        }
    },

});

Poems.attachSchema(Schemas.Poem);

Poems.helpers({
  displayTitle: function() {
    if (this.title == null)
        return this.lines[0].text
    else
        return this.title
  },

})

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
