window.Final = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Final.Routers.Router({
      $rootEl : $("#main"),
      pane1: $('#pane1'),
      pane2: $('#pane2'),
      pane3: $('#pane3'),
    });
    Backbone.history.start();
    $('.garage-button').click(function (event) {
      event.preventDefault();
      $(event.currentTarget).blur();
      Backbone.history.navigate('#/garage', {trigger: true});
    });
  }
};
