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

    "import": function (type) {
      var rootPoems = JSON.parse(Assets.getText("fixtures/rootPoems.json"))
      importedPoems = []
      console.log("read " + rootPoems.length + " rootPoems from file")
      rootPoems.forEach(function (poem) {
        console.log("inserting " + poem.title + " by " + poem.author)
        importedPoems.push(insertPoemFromImportSync(poem))
      });
      //console.log(rootPoems)
      return importedPoems;
    }

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

insertPoemFromImport = function(poem, callback) {
  delete poem.updatedAt
  Poems.insert(poem, function(err, res) {
    if (err) {
      console.log(err)
      poem.importOK = false
      poem.importErrorCode = err.code
      poem.importErrorMsg = (err.code == 11000 ? "Poem already exists" : err.err)
    }
    else poem.importOK = true
    callback(null, poem)   
  })
}

insertPoemFromImportSync = Meteor.wrapAsync(insertPoemFromImport)