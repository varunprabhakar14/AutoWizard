Final.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    this.panes = {};
    this.pane1 = options.pane1;
    this.pane2 = options.pane2;
    this.pane3 = options.pane3;
  },

  routes: {
    '':'makesIndex',
    'makes/:name':'makesShow',
    'makes/:make/models/:model':'modelsShow',
    ':styleId':'features'
  },

  makesIndex: function() {
    Final.Collections.makes.fetch();
    var view = new Final.Views.MakesIndex({
      collection: Final.Collections.makes
    });
    this._swapPane("pane1", view);
  },

  makesShow: function(name) {
    var carModels = new Final.Collections.Models([], {
      makeName : name
    });
    carModels.fetch();
    var view = new Final.Views.MakesShow({
      collection: carModels
    });
    this.makesIndex();
    this._swapPane("pane2", view);
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
    this.makesShow(make);
    this._swapPane("pane3", view);
  },

  features: function(styleId) {
    var listOfFeatures = new Final.Collections.Features([], {
      styleId: styleId
    })
    listOfFeatures.fetch();
    var view = new Final.Views.FeaturesIndex({
      collection: listOfFeatures
    })
  },

  _swapPane: function(paneName, view) {
    this._currentView && this._currentView.remove();
    for (var i = 1; i <= 3; i++) {
      var name = "pane" + i;
      if(name > paneName) {
        this.panes[name] && this.panes[name].remove();
      }
    }

    this.panes[paneName] = view;
    this[paneName].html(view.render().$el);
  },

  _swapView: function(view) {
    _(this.panes).each(function(selector, view) {
      view.remove();
    });
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
})
