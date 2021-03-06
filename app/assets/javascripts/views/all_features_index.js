Final.Views.AllFeaturesIndex = Backbone.View.extend({
  template: JST['each_category'],
  saveCarButton: JST['save_car_button'],

  events: {
    'change input[type=checkbox]': 'selectFeature',
    'click button': 'saveCar'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.model.set('features_attributes', []);
  },

  render: function() {
    this.$el.empty();
    var eachCategory = this.orderByCategory();
    var that = this;
    var no_additional_features = true
    _(eachCategory).each(function(values, category) {
      no_additional_features = false
      var content = that.template({values: values, category: category})
      that.$el.append(content);
    })
    if(no_additional_features) {
      this.$el.append("No Additional Features for this car. Click Save Car to continue!<br>")
    }
    this.$el.append(this.saveCarButton);
    return this;
  },

  orderByCategory: function() {
    var result = {};
    this.collection.each(function(el) {
      var el = el.attributes;
      if(el.price) {
        if(result[el.category]) {
          result[el.category].push({"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP})
        } else {
          result[el.category] = [{"id": el.id, "name": el.name, "description": el.description, "baseMSRP": el.price.baseMSRP}]
        }
      }
    })
    return result;
  },

  selectFeature: function(event) {
    var $target = $(event.currentTarget);
    if(!this.currentPrice) {
      this.currentPrice = parseInt(this.model.attributes.price);
    }

    if ($target.attr("checked")) {
      $target.removeAttr("checked");

      var toRemove = {
        name: $(event.currentTarget).data('name'),
        description: $(event.currentTarget).data('description'),
        price: $(event.currentTarget).data('basemsrp')
      };

      var index = this.model.get('features_attributes').indexOf(toRemove);
      this.model.get('features_attributes').splice(index, 1);

      this.currentPrice -= parseInt($(event.currentTarget).data('basemsrp'))
    } else {
      $target.attr("checked", "checked");

      this.currentPrice += parseInt($(event.currentTarget).data('basemsrp'))

      this.model.get('features_attributes').push({
        name: $(event.currentTarget).data('name'),
        description: $(event.currentTarget).data('description'),
        price: $(event.currentTarget).data('basemsrp')
      });
    }
  },

  saveCar: function(event) {
    if(this.currentPrice) {
      this.model.set({
        price: this.currentPrice
      })
    }
    var that = this;
    if(this.model.get('features_attributes').length === 0) {
      this.model.get('features_attributes').push({
        name: 'NONE',
        description: 'NONE',
        price: 'NONE'
      });
    }
    this.model.save({}, {
      success: function() {
        Backbone.history.navigate('garage', {trigger: true})
      }
    });
  }
});
