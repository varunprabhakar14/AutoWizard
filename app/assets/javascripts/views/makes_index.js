Final.Views.MakesIndex = Backbone.View.extend({
  template: JST['makes_index'],

  events: {
    'click li': 'selectMake'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ makes: this.collection });
    this.$el.html(content);
    return this;
  },

  selectMake: function(event) {
    var makeName = $(event.currentTarget).attr("data-name")
    Backbone.history.navigate('/makes/' + makeName, {trigger:true})
  }
});
