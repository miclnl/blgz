// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function ($) {
  var $comments = $('.js-comments');
  
    var api = '{{ .api }}';
    var gitProvider = '{{ .gitprovider }}';
    var username = '{{ .username }}';
    var repo = '{{ .repo }}';
    var branch = '{{ .branch }}';


  $('.js-form').submit(function () {
    var form = this;

    $(form).addClass('form--loading');

    $.ajax({
      type: $(this).attr('method'),
      url: ['https:/', api, 'v3/entry', gitProvider, username, repo, branch, 'comments'].join('/'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showModal('Perfect !', 'Thanks for your comment! It will show on the site once it has been approved. .');
        $(form).removeClass('form--loading');
      },
      error: function (err) {
        console.log(err);
        showModal('Error', 'Sorry, there was an error with the submission!');
        $(form).removeClass('form--loading');
      }
    });

    return false;
  });

  $('.js-close-modal').click(function () {
    $('body').removeClass('show-modal');
  });

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);

    $('body').addClass('show-modal');
  }
})(jQuery);