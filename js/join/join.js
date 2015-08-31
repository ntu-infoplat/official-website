(function () {
  var joinRow = $('.join-row');
  $('.join-row').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    }
  });
}());
