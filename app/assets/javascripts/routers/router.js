Final.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    '':'makesIndex',
    '/models':'modelsIndex'
  },

  makesIndex: function() {
    Final.Collections.makes.fetch();
    var view = new Final.Views.MakesIndex({
      collection: Final.Collections.makes
    });
    this._swapView(view);
  },

  modelsIndex: function() {
    Final.Collections.models.fetch();
    var view = new Final.Views.ModelsIndex({
      collection: Final.Collections.models
    });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
})
