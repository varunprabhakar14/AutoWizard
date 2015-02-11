Final.Views.CarView = Backbone.View.extend({
  carouselTemplate: JST['carousel'],
  carInfoTemplate: JST['car_info'],

  events: {
    "click .delete": "destroyCar"
  },

  render: function() {
    var that = this;

    var infoTemplate = this.carInfoTemplate({car: this.model})
    this.$el.append(infoTemplate)


    var features = new Final.Collections.Features([], {car_id: this.model.id});
    features.fetch();
    var featuresView = new Final.Views.ChosenFeatures({collection: features});
    this.$el.append(featuresView.render().$el)

    var styleId = this.model.get('trim_number');
    var AllPics = Backbone.Model.extend({
      url: 'https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=' + styleId + '&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
    });

    var beginning = 'http://media.ed.edmunds-media.com/'
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
