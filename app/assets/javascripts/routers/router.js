Final.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    '':'makesIndex',
    'makes/:name':'makesShow',
    'makes/:make/models/:model':'modelsShow'
  },

  makesIndex: function() {
    Final.Collections.makes.fetch();
    var view = new Final.Views.MakesIndex({
      collection: Final.Collections.makes
    });
    this._swapView(view);
  },

  makesShow: function(name) {
    var carModels = new Final.Collections.Models([], {
      makeName : name
    });
    carModels.fetch();
    var view = new Final.Views.MakesShow({
      collection: carModels
    });
    this._swapView(view);
  },

  modelsShow: function(make, model) {
    var carTrims = new Final.Collections.Trims([], {
      makeName: make,
      modelName: model
    })
    carTrims.fetch();
    var view = new Final.Views.ModelsShow({
      collection: carTrims
    })
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
})
