Final.Views.MakesShow = Backbone.View.extend({
  template: JST['makes_show'],

  events: {
    'click li': 'selectModel'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ models: this.collection });
    this.$el.html(content);
    return this;
  },

  selectModel: function(event) {
    var makeName = this.collection.makeName;
    var modelName = $(event.currentTarget).attr('data-name');
    Backbone.history.navigate('/makes/' + makeName + '/models/' + modelName, { trigger: true });
  }
});
