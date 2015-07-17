(function(){HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    this.subscribe('onlineUsers');
  },

  action: function() {
    this.render('Home');
  }
});

})();
