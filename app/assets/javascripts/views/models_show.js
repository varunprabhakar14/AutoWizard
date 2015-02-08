Final.Views.ModelsShow = Backbone.View.extend({
  template: JST['models_show'],

  events: {
    'click li': 'selectTrim'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  addStartingPrice: function($el) {
    this.collection.each(function(trim) {
      var styleId = trim.escape('id');
      var $li = $el.find('.' + styleId);

      var price = new Final.Models.StartingPrice([], {
        styleId: styleId
      });

      price.fetch({
        success: function() {
          var $price = "<br>Starting at: $" + price.attributes.value;
          $li.append($price);
        }
      });
    });
  },

  render: function() {
    var content = this.template({ trims: this.collection });
    this.$el.html(content);
    // this.addStartingPrice(this.$el);
    return this;
  },

  selectTrim: function(event) {
    var styleId = $(event.currentTarget).attr('data-style-id');
    Backbone.history.navigate('/' + styleId, { trigger: true });
  }
});
