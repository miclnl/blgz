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
	showModal("Verstuurd", "Uw reactie is verstuurd.");

    $.ajax({
      type: $(this).attr('method'),
      url: ['https:/', api, 'v3/entry', gitProvider, username, repo, branch, 'comments'].join('/'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showModal('Perfect !', 'Dank voor uw commentaar! De reactie verschijnt zodra deze verwerkt is.',5000);
        $(form).removeClass('spin');
      },
      error: function (err) {
        console.log(err);
        showModal('Error', 'Sorry, er ging wat fout..',5000);
        $(form).removeClass('spin');
      }
    });

    return false;
  });


  function showModal(title, message,timeout=1000) {
    $('#modal').html('<h2>' + title + '</h2><p>'+message+'</p>');
	$("#modal").fadeIn("fast");
	setTimeout(function(){$("#modal").fadeOut("fast")},timeout);
  }
})(jQuery);