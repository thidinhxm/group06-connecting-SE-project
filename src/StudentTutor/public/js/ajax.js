/*------- CHECK LOGIN -------*/
$('.btn-login-submit').click(function(e) {
    e.preventDefault();
    const email = $('#email-login').val();
    const password = $('#password-login').val();
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

/*------- CHECK SIGNUP STUDENT ACCOUNT -------*/
$('#btn-student-signup-submit').click(function(e) {
    e.preventDefault();
    const email = $('#student-email').val();
    const password = $('#student-password').val();
    const retypePassword = $('#student-retype-password').val();
    const fullname = $('#student-fullname').val();
    const displayName = $('#student-display-name').val();
    const phone = $('#student-phone').val();
    const address = $('#student-address').val();
    const birthday = $('#student-birthday').val();
    const gender = $('#student-gender').val();

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!email || !password || !retypePassword || !fullname || !displayName || !phone || !address || !birthday || !gender) {
        $('#student-signup-err-notification').text('Vui lòng nhập đầy đủ thông tin');
        return false;
    }

    if (!regex.test(password)) {
        $('#student-signup-err-notification').text('Mật khẩu phải có ít nhất 8 ký tự (không dấu), bao gồm chữ thường, chữ hoa và số.');
        return false;
    }

    if (password != retypePassword) {
        $('#student-signup-err-notification').text('Mật khẩu không khớp');
        return false;
    }

    $.ajax({
        url: '/api/check-exists-account',
        type: 'POST',
        data: {
            email: email
        },
        success: function(data) {
            if (data) {
                $('#student-signup-err-notification').text('Tài khoản đã tồn tại');
                return false;
            }
            else {
                $('#form-student-signup').submit();
                return true;
            }
        }
    });
});

