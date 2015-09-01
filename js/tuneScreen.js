(function () {
  var SECTIONRATIO = 589 / 589,
      deviceWidth,
      topSectionMinHeight,
      topSection = $('section.top-section'),
      sectionBackgroundImage = $('section.top-section > .background-wrapper > .background > img');
      contentWrapper = $('.main > .content-wrapper, section > .content-wrapper'),
      navbarWidth = $('nav').width() + 50;

  console.log(sectionBackgroundImage.height());
  console.log(contentWrapper);

  window.onresize = function () {
    deviceWidth = window.innerWidth;
    topSectionMinHeight = sectionBackgroundImage.height() * SECTIONRATIO;
    console.log(deviceWidth);
    console.log(sectionBackgroundImage.height() );
    if (deviceWidth > 1024) {
      contentWrapper.width(deviceWidth * 0.915 - navbarWidth);
    } else {
      if (contentWrapper.attr('style')) {
        contentWrapper.removeAttr('style');
      }
    }
    if (sectionBackgroundImage.height() > 0 && topSectionMinHeight < 715) {
      topSection.css('min-height', topSectionMinHeight);
    }
  };

  $(document).ready(function () {
    window.onresize();
  });
}());
