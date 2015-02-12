Final.Views.CarView = Backbone.View.extend({
  carouselTemplate: JST['carousel'],
  carInfoTemplate: JST['car_info'],

  events: {
    "click .delete": "destroyCar"
  },

  render: function() {
    var that = this;

    //make model trim
    var infoTemplate = this.carInfoTemplate({car: this.model})
    this.$el.append(infoTemplate)

    //features
    var features = new Final.Collections.Features([], {car_id: this.model.id});
    features.fetch();
    var featuresView = new Final.Views.ChosenFeatures({
      collection: features,
      model: this.model
    });
    this.$el.append(featuresView.render().$el)

    //fetching pictures
    var styleId = this.model.get('trim_number');
    var AllPics = Backbone.Model.extend({
      url: 'https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=' + styleId + '&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm',

      // parse: function(response) {
      //   var arr = [];
      //   _(response).each(function(el) {
      //     if(el.subType === 'exterior') {
      //       arr.push(el)
      //     }
      //   })
      //   return arr;
      // }
    });

    //rendering carousel
    var allPics = new AllPics();
    allPics.fetch({
      success: function() {
        var carouselContent = that.carouselTemplate({
          allPics: allPics,
          styleId: styleId
        });
        that.$el.append(carouselContent);
      }
    });

    return this;
  },

  destroyCar: function() {
    this.model.destroy();
  }
});
