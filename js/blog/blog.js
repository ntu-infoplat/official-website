(function () {
  $(document).ready(function () {
    var active = 1,
        blogCount = $('.blog-wrapper').length;

    $('.btn-next').on('click', function (e) {
      if (active < blogCount) {
        $('.blog-wrapper:nth-child(' + active +')').addClass('inactive');
        $('.blog-wrapper:nth-child(' + (active + 1) +')').addClass('active');
        active = active + 1;
      }
    });
    $('.btn-back').on('click', function (e) {
      if (active > 1) {
        $('.blog-wrapper:nth-child(' + active +')').removeClass('active');
        $('.blog-wrapper:nth-child(' + (active - 1) +')').removeClass('inactive');
        active = active - 1;
      }
    });
  })
}());
