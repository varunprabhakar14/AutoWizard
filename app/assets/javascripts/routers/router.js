Final.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    this.panes = {};
    this.pane1 = options.pane1;
    this.pane2 = options.pane2;
    this.pane3 = options.pane3;
    this.currentCar = new Final.Models.Car();
    this.startingPrice = this.currentCar.get('price');
    this.$body = $(".body");
  },

  routes: {
    '':'makesIndex',
    'makes/:name':'makesShow',
    'makes/:make/models/:model':'modelsShow',
    ':make/:model/:styleId':'allFeatures',
    'garage':'myGarage'
  },

  makesIndex: function() {
    this["pane2"].removeClass('on-screen');
    this["pane2"].addClass('off-screen');

    this["pane3"].removeClass('on-screen');
    this["pane3"].addClass('off-screen');

    this.$body.removeClass('body')
    this.$body.addClass('backbone')
    Final.Collections.makes.fetch();
    var view = new Final.Views.MakesIndex({
      collection: Final.Collections.makes
    });
    this.$rootEl.empty();
    this._swapPane("pane1", view);
  },

  makesShow: function(name) {
    this["pane3"].removeClass('on-screen');
    this["pane3"].addClass('off-screen');

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
    var that = this;
    var carTrims = new Final.Collections.Trims([], {
      makeName: make,
      modelName: model
    })
    carTrims.fetch();
    var view = new Final.Views.ModelsShow({
      collection: carTrims,
      model: that.currentCar
    })
    this.makesShow(make);
    this._swapPane("pane3", view);
  },

  allFeatures: function(make, model, styleId) {
    this.$body.removeClass('body')
    this.$body.addClass('backbone')
    var that = this;
    this.setCurrentCar(styleId);

    var listOfFeatures = new Final.Collections.AllFeatures([], {
      styleId: styleId
    })
    listOfFeatures.fetch();
    var view = new Final.Views.AllFeaturesIndex({
      collection: listOfFeatures,
      model: that.currentCar
    })
    this._swapView(view);
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

    this[paneName].removeClass('off-screen');
    this[paneName].addClass('on-screen');


  },

  _swapView: function(view) {
    _(this.panes).each(function(selector, view) {
      selector.remove();
    });
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  },

  setCurrentCar: function(styleId) {
    var that = this;

    var TrimInfo = Backbone.Model.extend({
      url: 'https://api.edmunds.com/api/vehicle/v2/styles/' + styleId + '?view=full&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm',
    })

    var trimInfo = new TrimInfo();
    trimInfo.fetch({
      success: function() {
        that.currentCar.set({
          make: trimInfo.attributes.make.name,
          model: trimInfo.attributes.model.name,
          trim_name: trimInfo.attributes.name,
          trim_number: trimInfo.attributes.id,
          price: trimInfo.attributes.price.baseMSRP
        })
      }
    })
  },

  myGarage: function() {
    this.$body.removeClass('body')
    this.$body.addClass('backbone')
    var myCars = new Final.Collections.Cars();
    myCars.fetch();

    var view = new Final.Views.Garage({
      collection: myCars
    });
    this._swapView(view);
  }
})
