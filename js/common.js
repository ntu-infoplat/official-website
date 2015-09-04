(function () {
  $('.btn-top').on('click', function (e) {
    e.preventDefault();
    // var target = hash,
        // $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': 0
    }, 750, 'swing', function () {
        window.location.hash = '#';
    });
  });
}());
