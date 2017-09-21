$('document').ready(function () {

  $('#tweet-form').bind('keyup', function() {
      //var charsRemaining = $('#counter').val();
      var typedChars = $(this).val().length;
      let remainingChars = (140 - typedChars);
      $('.counter').text(remainingChars);

      if (remainingChars < 0) {
          $('.counter').addClass('overLimit');
      } else {
          $('.counter').removeClass('overLimit');
      }
  });
});