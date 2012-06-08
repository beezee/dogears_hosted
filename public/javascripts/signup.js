(function($, exports) {
    $('document').ready(function() {
        $('#signup_form').submit(function(e) {
            var $uname = $('#user_name'), $pw = $('#password');
            e.preventDefault();
            $.post('./users/new', {u: $uname.val(), p: $pw.val()}, function(response) {
                var result = $.parseJSON(response);
                if (result.status && result.status === 'success') alert("Thanks, you're all signed up, now download a browser extension.");
                else alert(result.status);
                $uname.val(''); $pw.val('');
            });
        });
    });
}(jQuery, window));