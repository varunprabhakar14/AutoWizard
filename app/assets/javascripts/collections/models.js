Final.Collections.Models = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.makeName = options.makeName

  },

  model: Final.Models.Model,

  url: function () {
    return 'https://api.edmunds.com/api/vehicle/v2/' + this.makeName + '?state=new&year=2014&view=basic&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm';
  },

  parse: function(response) {
    return response.models;
  }
});
