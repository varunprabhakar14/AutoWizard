Final.Collections.Features = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.styleId = options.styleId;
    this.features = {}
  },

  model: Final.Models.Feature,

  url: function() {
    return 'https://api.edmunds.com/api/vehicle/v2/styles/' + this.styleId + '/options?fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
  },

  parse: function(response) {
    var that = this;
    _(response.options).each(function(el) {
      that.features[el.id] = {"name": el.name, "description": el.description, "category": el.category, "baseMSRP": el.price.baseMSRP}
    })
    return response.options;
  }
})
