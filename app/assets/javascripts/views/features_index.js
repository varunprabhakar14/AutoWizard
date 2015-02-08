Final.Views.FeaturesIndex = Backbone.View.extend({
  template: JST['each_category'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var eachCategory = this.orderByCategory();
    _(eachCategory).each(function(values, category) {
      var content = template({values: values, category: category})
      debugger
    })
  },

  orderByCategory: function() {
    var result = {};
    this.collection.each(function(el) {
      var el = el.attributes;
      if(result[el.category]) {
        result[el.category].push({"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP})
      } else {
        result[el.category] = [{"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP}]
      }
    })
    return result;
  }
});
