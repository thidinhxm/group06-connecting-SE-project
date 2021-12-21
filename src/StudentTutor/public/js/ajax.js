/*------- CHECK LOGIN -------*/
$('.btn-login-submit').click(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    if (email == '' || password == '') {
        $('#login-err-notification').text('Vui lòng nhập đầy đủ thông tin');
        return false;
    }
    $.ajax({
        url: '/api/check-account',
        type: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            if (!data) {
            $('#login-err-notification').text('Thông tin tài khoản chưa chính xác');
                return false;
            }
            else {
                $('#form-login').submit();
                return true;
            }
        }
    });

});
/*------- END CHECK LOGIN -------*/
