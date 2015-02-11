Final.Collections.Makes = Backbone.Collection.extend({
  model: Final.Models.Make,
  url: 'https://api.edmunds.com/api/vehicle/v2/makes?state=new&year=2014&view=basic&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm',

  parse: function(response) {
    return response.makes;
  }

  // getOrFetch: function(id) {
  //   var makes = this;
  //   var make = this.get(id);
  //   if(make) {
  //     make.fetch();
  //   } else {
  //     make = new Final.Models.Make({ id: id });
  //     make.fetch({
  //       success: function() {
  //         makes.add(make)
  //       }
  //     })
  //   }
  //   return make;
  // }
});

Final.Collections.makes = new Final.Collections.Makes();
