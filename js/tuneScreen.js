(function () {
  var SECTIONRATIO = 589 / 589,
      deviceWidth,
      topSection = $('section.top-section'),
      sectionBackgroundImage = $('section.top-section > .background-wrapper > .background > img');
      contentWrapper = $('.main > .content-wrapper, section > .content-wrapper'),
      navbarWidth = $('nav').width() + 50;

  console.log(sectionBackgroundImage.height());
  console.log(contentWrapper);

  window.onresize = function () {
    deviceWidth = window.innerWidth;
    console.log(deviceWidth);
    contentWrapper.width(deviceWidth * 0.915 - navbarWidth);
    if (sectionBackgroundImage.height() > 0) {
      topSection.css('min-height', sectionBackgroundImage.height() * SECTIONRATIO);
    }
  };

  $(document).ready(function () {
    window.onresize();
  });
}());
