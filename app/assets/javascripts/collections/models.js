Final.Collections.Models = Backbone.Collection.extend({
  model: Final.Models.Model,
  url: 'https://api.edmunds.com/api/vehicle/v2/acura?state=new&year=2015&view=basic&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm',

  parse: function(response) {
    return response.models;
  }
});

Final.Collections.models = new Final.Collections.Models();
