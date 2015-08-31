(function () {
  $(document).ready(function () {
    var SECTIONRATIO = 589 / 589,
        deviceWidth,
        topSection = $('section.top-section'),
        sectionBackgroundImage = $('section:first-of-type > .background-wrapper > .background > img');
        contentWrapper = $('.content-wrapper'),
        navbarWidth = $('nav').width() + 50;

    console.log(sectionBackgroundImage.height());

    window.onresize = function () {
      deviceWidth = window.innerWidth;
      console.log(deviceWidth);
      contentWrapper.width(deviceWidth * 0.915 - navbarWidth) ;
      topSection.css('min-height', sectionBackgroundImage.height() * SECTIONRATIO);
    };

    window.onresize();
  });
}());
