Final.Views.ModelsShow = Backbone.View.extend({
  template: JST['models_show'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  addStartingPrice: function($el) {
    this.collection.each(function(trim) {
      var styleId = trim.escape('id');
      var $li = $el.find('.' + styleId);

      var Price = Backbone.Model.extend({
        initialize: function(attributes, options) {

        },

        url: function () {
          return 'https://api.edmunds.com/v1/api/configurator/default?zip=90019&styleid=' + styleId + '&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
        },
        toJSON: function () {
          return _.clone(this.attributes.response);
        },
        parse: function(response) {
          return response.pricingAttributeGroup.attributes.MSRP;
        }
      })

      var price = new Price();
      price.fetch({
        success: function() {
          var $price = "<br>Starting at: $" + price.attributes.value;
          $li.append($price);
          console.log($li.data('price', price.attributes.value))
        }
      });
    });
  },

  render: function() {
    var content = this.template({ trims: this.collection });
    this.$el.html(content);
    this.addStartingPrice(this.$el);
    debugger
    return this;
  }

  // events: {
  //   'click li': 'selectTrim'
  // },

  // initialize: function() {
  //   this.listenTo(this.collection, 'sync', this.render);
  // },

  // selectTrim: function(event) {
  //   var makeName = this.collection.makeName;
  //   var modelName = $(event.currentTarget).attr('data-name');
  //   Backbone.history.navigate('/makes/' + makeName + '/models/' + modelName);
  // }
});
