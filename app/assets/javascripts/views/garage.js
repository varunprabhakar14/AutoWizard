Final.Views.Garage = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var that = this;
    this.collection.each(function(car) {
      var carView = new Final.Views.CarView({
        model: car
      })

      that.$el.prepend(carView.render().$el);
    })
    return this;
  }
});
