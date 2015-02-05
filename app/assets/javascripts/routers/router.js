Final.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    '':'makeIndex',
    '':'modelIndex'
  },

  makeIndex: function() {
    var that = this;

    // Final.Collections.makes.fetch({
    //   success: function() {
    //     var view = new Final.Views.MakesIndex({
    //       collection: Final.Collections.makes
    //     })
    //     that.$rootEl.html(view.render().$el);
    //   }
    // })

    Final.Collections.makes.fetch();
    var view = new Final.Views.MakesIndex({
      collection: Final.Collections.makes
    });
    this.$rootEl.html(view.render().$el);
  }
})
