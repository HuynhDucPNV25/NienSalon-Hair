$('.rating input').change(function () {
    var $radio = $(this);
    $('.rating .selected').removeClass('selected');
    $radio.closest('label').addClass('selected');
  });