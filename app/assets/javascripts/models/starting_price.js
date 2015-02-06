Final.Models.StartingPrice = Backbone.Model.extend({
  initialize: function(attributes, options) {
    this.styleId = options.styleId
  },

  urlRoot: function () {
    return 'https://api.edmunds.com/v1/api/configurator/default?zip=95051&styleid=' + this.styleId + '&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
  },

  parse: function(response) {
    return response.pricingAttributeGroup.attributes.MSRP;
  }
})
