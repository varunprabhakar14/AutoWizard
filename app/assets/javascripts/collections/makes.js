Final.Collections.Makes = Backbone.Collection.extend({
  model: Final.Models.Make,
  url: 'https://api.edmunds.com/api/vehicle/v2/makes?state=new&year=2014&view=basic&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm',

  parse: function(response) {
    return response.makes;
  }
});

Final.Collections.makes = new Final.Collections.Makes();
