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

      var query = {
        numberOfLines: requestedNumberOfLines
      }

      // mode: originals
      if (Sessions.current() && Sessions.current().selectionMode == "originals" ) {
        query["modificationDepth"] = {$exists: false}
      }

      // mode: same_session
      // if (Sessions.current() && Sessions.current().selectionMode == "same_session" ) {
      //   var poems_ids = Sessions.current().history.map( function(entry){ return entry.poem })
      // }      

      // mode: last_hour_and_originals
      if (Sessions.current() && Sessions.current().history && Sessions.current().selectionMode == "last_hour_and_originals" ) {
        var offset = 1000 * 60 * 60 // 1 hour
        var latest_poems = Sessions.current().history.filter( function(entry) { return entry.startTime.getTime() > ( Date.now() - offset ) })
        var poems_ids = latest_poems.map( function(entry){ return entry.poem })
        var originals_poems_query = {modificationDepth : {$exists: false}}
        var latest_peoms_query = { _id: { $in: poems_ids } }
        query['$or'] = [originals_poems_query, latest_peoms_query]
      }      

      console.log('next query: ', query)

      const possiblePoems = _.shuffle(Poems.find(query).fetch())
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
