Final.Views.ModelsIndex = Backbone.View.extend({
  template: JST['makes_show'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ models: this.collection });
    this.$el.html(content);
    return this;
  }
});
