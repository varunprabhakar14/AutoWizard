window.Final = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Final.Routers.Router({
      $rootEl : $("#main"),
      pane1: $('#pane1'),
      pane2: $('#pane2'),
      pane3: $('#pane3'),
    });
    Backbone.history.start();
    $('.garage-button').click(function (event) {
      event.preventDefault();
      $(event.currentTarget).blur();
      Backbone.history.navigate('#/garage', {trigger: true});
    });
  }
};

$(document).ready(function(){

  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top
  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

});
