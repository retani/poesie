/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */

   'sessions/next': function() {

      const requestedNumberOfLines = Meteor.users.totalPlayers() == 0 ? 1 : Meteor.users.totalPlayers()
      const possiblePoems = _.shuffle(Poems.find({ numberOfLines: requestedNumberOfLines }).fetch())
      const currentPoem = Sessions.current().currentPoem()
      
      var basePoem = possiblePoems[0]
      if (currentPoem && currentPoem.title === basePoem.title && possiblePoems.length > 1 ) {
        basePoem = possiblePoems[1] // take a chance
      } 

      /*
       var mappings;
       for (i = 0, i <= basePoem.numberOfLines, i++) {

       }*/
       var mappings = []
       Meteor.users.allPlayers().forEach(function (user) {
          mappings.push(user.username)
       });

       //Meteor.users.totalPlayers()
       console.log(Meteor.users.allPlayers().count())
       Sessions.current().newEntry(basePoem, mappings)
       //console.log("new: " + this.currentPoem().title)
   },

  'sessions/active/touch': function() {
      const activeSession = Sessions.current()
      if (activeSession) {
        Sessions.update( activeSession, { $set: { touchedAt: new Date() }})
      }
  },

  'sessions/newEntry': function (basePoem, mappings, session) {
    thisSession = session

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
        startTime: Date.now(),
        mappings: mappings
      }
      Sessions.update({ _id: thisSession._id },{ $push: { history: { $each: [newEntry], $position:0 } }})
    })
  },

});
