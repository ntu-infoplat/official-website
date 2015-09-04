(function () {
  $(document).ready(function () {
    var active = 1,
        clubCount = $('.club-wrapper').length;

    $('.btn-next').on('click', function (e) {
      if (active < clubCount) {
        $('.club-wrapper:nth-child(' + active +')').addClass('inactive');
        $('.club-wrapper:nth-child(' + (active + 1) +')').addClass('active');
        active = active + 1;
      }
    });
    $('.btn-back').on('click', function (e) {
      if (active > 1) {
        $('.club-wrapper:nth-child(' + active +')').removeClass('active');
        $('.club-wrapper:nth-child(' + (active - 1) +')').removeClass('inactive');
        active = active - 1;
      }
    });
  })
}());
