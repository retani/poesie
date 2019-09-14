/*****************************************************************************/
/* Edit: Event Handlers */
/*****************************************************************************/
Template.EditSession.events({
  "click .remove": function () {
    if (confirm("remove the session \"" + session.displayTitle() + "\"?")) {
      Router.go('sessions');
      //alert("ok")
      Sessions.remove(session._id)
    }  
  },
  "click .removePoems": function () {
    if (confirm("REMOVE ALL POEMS CREATED IN THIS SESSION?")) {
      thisSession = session
      session.history.forEach( function(item, i) {
        p = Poems.findOne(item.poem)
        if (p != undefined) {
          console.log("removing poem " + p.displayTitle() )
          Poems.remove(p._id)
          Sessions.update({ _id: thisSession._id },{ $pull: { history: { poem: p._id } } })
        }
      })
      //alert("ok")
      //Sessions.remove(session._id)
    }  
  }  
});

/*****************************************************************************/
/* Edit: Helpers */
/*****************************************************************************/
Template.EditSession.helpers({
  session: function () {
    var id = Router.current().params._id
    if (id) {
      session = Sessions.findOne( { _id: id } )
      console.log(session)
      return session
    }
  }  
});

/*****************************************************************************/
/* Edit: Lifecycle Hooks */
/*****************************************************************************/
Template.Edit.created = function () {
};

Template.Edit.rendered = function () {
};

Template.Edit.destroyed = function () {
};
