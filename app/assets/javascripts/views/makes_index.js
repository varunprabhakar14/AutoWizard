Final.Views.MakesIndex = Backbone.View.extend({
  // tagName: 'ul',
  template: JST['makes_index'],

  // initialize: function() {
  //   this.subViews = [];
  // },

  events: {
    'click li': 'selectMake',
    'click button': 'goToGarage'
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
  },

  goToGarage: function() {
    Backbone.history.navigate('/garage', {trigger: true})
  }
});
