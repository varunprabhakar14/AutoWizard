window.Final = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Final.Routers.Router({
      $rootEl : $("#main")
    });
    Backbone.history.start();
  }
};
