(function () {
  var deviceWidth,
      contentWrapper = $('.content-wrapper'),
      navbarWidth = $('nav').width() + 50;

  window.onresize = function () {
    deviceWidth = window.innerWidth;
    console.log(deviceWidth);
    contentWrapper.width(deviceWidth * 0.915 - navbarWidth) ;
  };
  
  window.onresize();
}());
