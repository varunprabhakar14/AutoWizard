Final.Views.ModelsShow = Backbone.View.extend({
  template: JST['models_show'],

  events: {
    'click li': 'selectTrim'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  setStartingPrice: function($el) {
    var that = this;
    this.collection.each(function(trim) {
      var styleId = trim.escape('id');
      var $li = $el.find('.' + styleId);

      var price = new Final.Models.StartingPrice([], {
        styleId: styleId
      });

      price.fetch({
        success: function() {
          // var $price = "<br>Starting at: $" + price.attributes.value;
          // $li.append($price);
          // $li.data('price', price.attributes.value)
          that.model.set({price: price.attributes.value})
        }
      });
    });
  },

  render: function() {
    var content = this.template({ trims: this.collection });
    this.$el.html(content);
    // this.setStartingPrice(this.$el);
    return this;
  },

  selectTrim: function(event) {
    // event.preventDefault();
    var that = this;

    var styleId = $(event.currentTarget).data('style-id');
    var trim_name = $(event.currentTarget).data('name');

    // var price = new Final.Models.StartingPrice([], {
    //   styleId: styleId
    // });
    //
    // price.fetch({
    //   success: function() {
    //     that.model.set({price: price.attributes.value})
    //   }
    // });
    //
    // this.model.set({
    //   make: this.collection.makeName,
    //   model: this.collection.modelName,
    //   trim_name: trim_name,
    //   trim_number: styleId,
    // })
    Backbone.history.navigate(this.collection.makeName + '/' + this.collection.modelName + '/' + styleId, { trigger: true });
  }
});
