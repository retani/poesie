Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  progressDelay : 800
});
    
/** download BEGIN **/

Router.map(function() {
  this.route('download', {
    where: 'server',
    path: 'download',
    action: function() {
      var self = this;

      // Create zip
      var zip = new JSZip();

      // Add files to the zip

      //Poems.find({ "rootPoem" : null }).forEach( function(poem) {
      //  zip.file(poem._id+'.json', JSON.stringify(poem));
      //})

      zip.file('rootPoems.json', JSON.stringify(Poems.find({ "rootPoem" : null }).fetch()));

      // Generate zip stream
      var output = zip.generate({
        type:        "nodebuffer",
        compression: "DEFLATE"
      });

      // Set headers
      self.response.setHeader("Content-Type", "application/octet-stream");
      self.response.setHeader("Content-disposition", "attachment; filename=poems-"+moment().format("YYYY-MM-DD-HH-mm")+".zip");
      self.response.writeHead(200);

      // Send content
      self.response.end(output);
    }
  });
});

/** download END **/

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


Router.route('play', {
  name: 'play',
  controller: 'PlayController',
  onRun: function () {
      console.log("PLAY")
      this.next()
    },
  where: 'client',
  layoutTemplate: 'PlainLayout',
})

Router.after(function () { // TODO: fix these too many calls (see log)
  //if (Meteor.isServer){
    //console.log("route change from " + Meteor.user().profile.route + " to " + this.route.getName() + " user: " + Meteor.user()._id)
    //if (this.route.getName() == "play") {
      Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.route":this.route.getName()}})
    //}
  //}

    //this.next()
  });


Router.route('sessions', {
  name: 'sessions',
  controller: 'SessionsController',
  action: 'action',
  where: 'client'
});


Router.route('sessions/new', {
  name: 'sessionNew',
  controller: 'EditSessionController',
  action: 'action',
  where: 'client'
});

Router.route('sessions/edit', {
  path: 'sessions/edit/:_id',
  name: 'sessionEdit',
  controller: 'EditSessionController',
  action: 'action',
  where: 'client',
  //data: { poem: Sessions.findOne( { _id: this.params._id } ) }
});

Router.route('gallery', {
  name: 'gallery',
  controller: 'GalleryController',
  action: 'action',
  where: 'client'
});