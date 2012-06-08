(function($, exports) {
    $('document').ready(function() {
        $('#signup_form').submit(function(e) {
            e.preventDefault();
            var pw = $.sha256($("#password").val());
            var uname = $('#user_name').val();
            $.post('./users/new', {u: uname, p: pw}, function(response) {
                console.log(response);
            });
        });
    });
}(jQuery, window));