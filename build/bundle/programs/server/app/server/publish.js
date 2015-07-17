(function(){/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('poems', function (/* args */) {
  return Poems.find();
});

})();
