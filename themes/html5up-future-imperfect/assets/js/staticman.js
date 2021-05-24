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


    $.ajax({
      type: $(this).attr('method'),
      url: ['https:/', api, 'v3/entry', gitProvider, username, repo, branch, 'comments'].join('/'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showModal('Perfect !', 'Dank voor uw commentaar! De reactie verschijnt zodra deze verwerkt is.');
        $(form).removeClass('spin');
      },
      error: function (err) {
        console.log(err);
        showModal('Error', 'Sorry, er ging wat fout..');
        $(form).removeClass('spin');
      }
    });

    return false;
  });


  function showModal(title, message) {
    $('#modal').html('<h2>' + title + '</h2><p>'+message+'</p>');
	$("#modal").fadeIn("fast");
	setTimeout(function(){$("#modal").fadeOut("fast")},1000);
  }
})(jQuery);