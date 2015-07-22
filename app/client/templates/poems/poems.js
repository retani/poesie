/*****************************************************************************/
/* Poems: Event Handlers */
/*****************************************************************************/
Template.Poems.events({
  "click .import": function () {
    Meteor.call('import', "rootPoems", function (error, result) {
      if (error) console.log(error)
      console.log(result)
      Session.set('importedPoems',result)
    });
  }
});

/*****************************************************************************/
/* Poems: Helpers */
/*****************************************************************************/
Template.Poems.helpers({
  poems: function () {
    return Poems.find({rootPoem: null}, {sort: [["numberOfLines","asc"]]});
  }
});

Template.Poem.helpers({
  isNewPoem: function () {
    return typeof this.updatedAt != "undefined" && (new Date).getTime() - this.updatedAt.getTime() < 200000
  },
  importedPoems: function(){ 
    console.log("importedPoems")
    console.log(Session.get('importedPoems'))
    return Session.get('importedPoems')
  }
})

/*****************************************************************************/
/* Poems: Lifecycle Hooks */
/*****************************************************************************/
Template.Poems.created = function () {
};

Template.Poems.rendered = function () {
};

Template.Poems.destroyed = function () {
};
