Final.Views.Garage = Backbone.View.extend({
  template: JST['carousel'],

  events: {
    "click .delete": "destroyCar"
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var that = this;
    this.collection.each(function(car) {
      var styleId = car.get('trim_number');

      var AllPics = Backbone.Model.extend({
        url: 'https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=' + styleId + '&fmt=json&api_key=u79wmp7tc5htfw2c2m6wfvdm'
      });

      var beginning = 'http://media.ed.edmunds-media.com/'
      var allPics = new AllPics();
      allPics.fetch({
        success: function() {
          var carouselContent = that.template({
            allPics: allPics
          });
          that.$el.append(carouselContent);
        }
      });
    })
    return this;
  },

  destroyCar: function(event) {
    // var $target = $(event.currentTarget);
    // var car = this.collection.get($target.attr("data-id"));
    // car.destroy();
  }
});

$.Carousel = function (el) {
  this.$el = $(el);
  this.$items = this.$el.find(".items").children();
  this.activeIdx = 0;
  this.transitioning = false;

  this.$items.eq(0).addClass("active");

  this.$el.on("click", "a.slide-left", this.slideLeft.bind(this));
  this.$el.on("click", "a.slide-right", this.slideRight.bind(this));
};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true;

  var $oldItem = this.$items.eq(this.activeIdx);
  this.activeIdx =
  (this.activeIdx + dir + this.$items.length) % this.$items.length;
  var $newItem = this.$items.eq(this.activeIdx);

  var newSide, oldSide;
  if (dir == 1) {
    newSide = "right";
    oldSide = "left";
  } else {
    newSide = "left";
    oldSide = "right";
  }

  $newItem.addClass("active " + newSide);
  $oldItem.one("transitionend", (function () {
    $oldItem.removeClass("active " + oldSide);
    this.transitioning = false;
  }).bind(this));

  setTimeout((function () {
    $oldItem.addClass(oldSide);
    $newItem.removeClass(newSide);
  }).bind(this), 0);
};

$.Carousel.prototype.slideLeft = function () { this.slide(1); };
$.Carousel.prototype.slideRight = function () { this.slide(-1); };

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$(function () {
  $(".carousel").carousel();
});
