/*****************************************************************************/
/* Poems: Event Handlers */
/*****************************************************************************/
Template.Poems.events({
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
