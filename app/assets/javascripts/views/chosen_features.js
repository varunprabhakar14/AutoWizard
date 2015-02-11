Final.Views.ChosenFeatures = Backbone.View.extend({
  template: JST['chosen_features'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var that = this;
    var content = that.template({features: this.collection})
    that.$el.append(content)
    return this;
  }
});
