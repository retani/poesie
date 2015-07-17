(function(){Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});


Router.route('poems', {
  name: 'poems',
  controller: 'PoemsController',
  action: 'action',
  where: 'client'
});

Router.route('poems/new', {
  name: 'poemNew',
  controller: 'EditController',
  action: 'action',
  where: 'client'
});

Router.route('poems/edit', {
  path: 'poems/edit/:_id',
  name: 'poemEdit',
  controller: 'EditController',
  action: 'action',
  where: 'client',
  //data: { poem: Poems.findOne( { _id: this.params._id } ) }
});


Router.route('screen', {
  name: 'screen',
  controller: 'ScreenController',
  action: 'action',
  where: 'client',
  layoutTemplate: 'PlainLayout'
});

})();
