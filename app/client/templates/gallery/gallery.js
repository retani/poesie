/*****************************************************************************/
/* Gallery: Event Handlers */
/*****************************************************************************/
Template.Gallery.events({
});

/*****************************************************************************/
/* Gallery: Helpers */
/*****************************************************************************/
Template.Gallery.helpers({
  poems: function () {
    return Poems.find( {rootPoem: { $not: null}}, {sort: [["author","asc"]]});
  }  
});

/*****************************************************************************/
/* Gallery: Lifecycle Hooks */
/*****************************************************************************/
Template.Gallery.created = function () {
};

Template.Gallery.rendered = function () {
};

Template.Gallery.destroyed = function () {
};
