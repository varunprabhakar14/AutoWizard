Final.Collections.Features = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.styleId = options.styleId;
  },

  model: Final.Models.Feature,

  url: function() {
    return 'https://api.edmunds.com/api/vehicle/v2/styles/' + this.styleId + '/options?fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
  },

  parse: function(response) {
    _(response.options).each(function(el) {
      debugger
    })
    return response;
  }
})
