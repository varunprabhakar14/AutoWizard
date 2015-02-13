Final.Views.Garage = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'destroy remove sync', this.render)
  },

  render: function() {
    this.$el.empty();
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
