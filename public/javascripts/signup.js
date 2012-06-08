(function($, exports) {
    $('document').ready(function() {
        $('#signup_form').submit(function(e) {
            e.preventDefault();
            var pw = $.sha256($("#password").val());
            var uname = $('#user_name').val();
            $.post('./users/new', {u: uname, p: pw}, function(response) {
                var result = $.parseJSON(response);
                if (result.status && result.status === 'success') alert("Thanks, you're all signed up, now download a browser extension.");
                else alert("Oops- there was a problem creating your account.");
            });
        });
    });
}(jQuery, window));