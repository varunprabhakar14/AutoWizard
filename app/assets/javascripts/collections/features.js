Final.Collections.Features = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.trimId = options.trimId;
  },

  model: Final.Models.Feature,

  url: function() {
    return 'https://api.edmunds.com/api/vehicle/v2/styles/' + this.trimId + '/options?fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
  },

  parse: function(response) {
    return response;
  }
})
