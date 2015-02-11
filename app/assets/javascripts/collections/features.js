Final.Collections.Features = Backbone.Collection.extend({
  model: Final.Models.Feature,
  url: function () {
    return 'api/cars/' + this.car_id + '/features';
  },

  initialize: function (collection, options) {
    this.car_id = options.car_id;
  }
});
