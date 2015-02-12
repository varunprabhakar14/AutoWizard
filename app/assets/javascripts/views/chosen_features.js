Final.Views.ChosenFeatures = Backbone.View.extend({
  template: JST['chosen_features'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    this.$el.empty();
    var content = this.template({
      features: this.collection,
      finalPrice: this.model.get('price')
    })
    this.$el.append(content)
    return this;
  }
});
