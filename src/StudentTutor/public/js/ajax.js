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

    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!email || !password || !retypePassword || !fullname || !displayName || !phone || !address || !birthday || !gender) {
        $('#student-signup-err-notification').text('Vui lòng nhập đầy đủ thông tin');
        return false;
    }

    if (!regexPassword.test(password)) {
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

/*------- CHECK SIGNUP TUTOR ACCOUNT -------*/
$('#btn-tutor-signup-submit').click(function(e) {
    e.preventDefault();
    const email = $('#tutor-email').val();
    const password = $('#tutor-password').val();
    const retypePassword = $('#tutor-retype-password').val();
    const fullname = $('#tutor-fullname').val();
    const displayName = $('#tutor-display-name').val();
    const phone = $('#tutor-phone').val();
    const address = $('#tutor-address').val();
    const birthday = $('#tutor-birthday').val();
    const gender = $('#tutor-gender').val();
    const job = $('#tutor-job').val();
    const salary = $('#tutor-salary').val();
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    
    const grades = (function() {
        let gradeList = [];
        $('input[name="grade"]:checked').each(function() {
            gradeList.push($(this).val());
        });
        return gradeList;
    })();

    const fGrade =$('input[name="fgrade"]').val();

    const subjects = (function() {
        let subjectList = [];
        $('input[name="subject"]:checked').each(function() {
            subjectList.push($(this).val());
        });
        return subjectList;
    })();

    const fSubject = $('input[name="fsubject"]').val();

    const times = (function() {
        let timeList = [];
        $('input[name="time"]:checked').each(function() {
            timeList.push($(this).val());
        });
        return timeList;
    })();

    const fTime = $('input[name="ftime"]').val();

    const areas = (function() {
        let areaList = [];
        $('input[name="area"]:checked').each(function() {
            areaList.push($(this).val());
        });
        return areaList;
    })();

    const fArea = $('input[name="farea"]').val();

    if (!email || !password || !retypePassword) {
            $('#tutor-signup-err-notification').text('Vui lòng nhập đầy đủ thông tin tài khoản');
        return false;
    }

    if (!fullname || !displayName || !phone || !address || !birthday || !salary || !gender || !job) {
        $('#tutor-signup-err-notification').text('Vui lòng nhập đầy đủ thông tin cá nhân');
        return false;
    }


    if (!regexPassword.test(password)) {
        $('#tutor-signup-err-notification').text('Mật khẩu phải có ít nhất 8 ký tự (không dấu), bao gồm chữ thường, chữ hoa và số.');
        return false;
    }

    if (password != retypePassword) {
        $('#tutor-signup-err-notification').text('Mật khẩu không khớp');
        return false;
    }

    if (!fullname || !displayName || !phone || !address || !birthday || !salary || !gender || !job) {
        $('#tutor-signup-err-notification').text('Vui lòng nhập đầy đủ thông tin cá nhân');
    }

    if (birthday > new Date()) {
        $('#tutor-signup-err-notification').text('Ngày sinh không hợp lệ');
        return false;
    }

    if (grades.length == 0 && fGrade == '') {
        $('#tutor-signup-err-notification').text('Vui lòng chọn lớp học có thể dạy');
        return false;
    }

    if (subjects.length == 0 && fSubject == '') {
        $('#tutor-signup-err-notification').text('Vui lòng chọn môn học có thể dạy');
        return false;
    }

    if (times.length == 0 && fTime == '') {
        $('#tutor-signup-err-notification').text('Vui lòng chọn thời gian có thể dạy');
        return false;
    }

    if (areas.length == 0 && fArea == '') {
        $('#tutor-signup-err-notification').text('Vui lòng chọn khu vực có thể dạy');
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
                $('#tutor-signup-err-notification').text('Tài khoản đã tồn tại');
                return false;
            }
            else {
                $('#form-tutor-signup').submit();
                return true;
            }
        }
    });
});

