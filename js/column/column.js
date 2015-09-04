(function () {
  $(document).ready(function () {
    var active = 1,
        columnCount = $('.column-wrapper').length;

    $('.btn-next').on('click', function (e) {
      if (active < columnCount) {
        $('.column-wrapper:nth-child(' + active +')').addClass('inactive');
        $('.column-wrapper:nth-child(' + (active + 1) +')').addClass('active');
        active = active + 1;
      }
    });
    $('.btn-back').on('click', function (e) {
      if (active > 1) {
        $('.column-wrapper:nth-child(' + active +')').removeClass('active');
        $('.column-wrapper:nth-child(' + (active - 1) +')').removeClass('inactive');
        active = active - 1;
      }
    });
  })
}());
