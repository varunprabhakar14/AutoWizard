Final.Views.MakesIndex = Backbone.View.extend({
  template: JST['makes_index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ makes: this.collection });
    this.$el.html(content);
    return this;
  }
});
