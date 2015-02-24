Final.Collections.AllFeatures = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.styleId = options.styleId;
    // this.features = {}
  },

  model: Final.Models.AllFeatures,

  url: function() {
    return 'https://api.edmunds.com/api/vehicle/v2/styles/' + this.styleId + '/options?fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
  },

  parse: function(response) {
    return response.options;
  }
})
