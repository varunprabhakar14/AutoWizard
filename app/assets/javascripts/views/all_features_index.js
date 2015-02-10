Final.Views.AllFeaturesIndex = Backbone.View.extend({
  template: JST['each_category'],
  saveCarButton: JST['save_car_button'],

  events: {
    'click .checkbox': 'selectFeature',
    'click button': 'saveCar'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    // this.currentPrice = parseInt(this.model.attributes.price);
    this.features = new Final.Collections.Features();
  },

  render: function() {
    var eachCategory = this.orderByCategory();
    var that = this;
    _(eachCategory).each(function(values, category) {
      var content = that.template({values: values, category: category})
      that.$el.append(content);
    })
    this.$el.append(this.saveCarButton);
    return this;
  },

  orderByCategory: function() {
    var result = {};
    this.collection.each(function(el) {
      var el = el.attributes;
      if(result[el.category]) {
        result[el.category].push({"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP})
      } else {
        result[el.category] = [{"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP}]
      }
    })
    return result;
  },

  selectFeature: function(event) {
    if(!this.currentPrice) {
      this.currentPrice = parseInt(this.model.attributes.price);
    }
    if(event.currentTarget.className === 'checkbox') {
      $(event.currentTarget).addClass('checked');

      this.currentPrice += parseInt($(event.currentTarget).data('basemsrp'))

      var feature = new Final.Models.Feature({
        name: $(event.currentTarget).data('name'),
        description: $(event.currentTarget).data('description'),
        currentPrice: $(event.currentTarget).data('basemsrp')
      })

      $(event.currentTarget).data('model-id',feature.cid)

      this.features.add(feature);
    } else {
      $(event.currentTarget).removeClass('checked');

      var toRemove = this.features.get($(event.currentTarget).data('model-id'))

      this.features.remove(toRemove)
      this.currentPrice -= parseInt($(event.currentTarget).data('basemsrp'))
    }
  },

  saveCar: function(event) {
    debugger
  }
});
