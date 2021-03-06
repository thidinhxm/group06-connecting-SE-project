$(function () {
    'use strict';


    $('.form-control').on('input', function () {
        var $field = $(this).closest('.form-group');
        if (this.value) {
            $field.addClass('field--not-empty');
        } else {
            $field.removeClass('field--not-empty');
        }
    });

});


// ------------ Begin JS Profile ---------------

$('.btn-change-avatar').on('click', (e) => {
    $('.form-change-avatar').toggleClass('d-none');
})

$('.form-change-infor input').on('click', (e) => {
    $('.submit-change-info.d-none').removeClass('d-none');
})

$('.change-password').on('click', (e) => {
    $('.form-change-password').toggleClass('d-none');
})

$('.btn-change-password').click(() => {
    const cpw = $('.cur-password').val();
    const pw = $('.new-password').val();
    const rpw = $('.renew-password').val();
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!cpw || !pw || !rpw) {
        $('.mes-password').text('Vui lòng nhập đầy đủ các trường.');
        return;
    }

    if (!regex.test(pw)) {
        $('.mes-password').text('Mật khẩu phải có ít nhất 8 ký tự (không dấu), bao gồm cả chữ và số.');
        return
    }

    if (pw != rpw) {
        $('.mes-password').text('Mật khẩu mới không trùng khớp');
        return;
    }

    $('.form-change-password').submit();
})

$('.form-change-password input').click(() => {
    $('.mes-password').text('');
})

// ----------- End JS Profile ---------------

// ----------- End JS PostList ---------------
$('.postList .btn-request-form').click((e) => {
    const idNode = e.target.offsetParent.firstElementChild.firstElementChild.children[1]

    $('.postList #fidpost').val(idNode.innerText);

})
// ----------- End JS PostList ---------------

// --------table- form - time signup tutor
$('.table-form-time .day').on('click', (e) => {
    const sang = e.target.nextElementSibling;
    const chieu = sang.nextElementSibling;
    const toi = chieu.nextElementSibling;
    checkSang = $(sang.firstElementChild.firstElementChild);
    checkChieu = $(chieu.firstElementChild.firstElementChild);
    checkToi = $(toi.firstElementChild.firstElementChild);

    checkSang.prop('checked', !checkSang.is(':checked'))
    checkChieu.prop('checked', !checkChieu.is(':checked'))
    checkToi.prop('checked', !checkToi.is(':checked'))
})

function checkValue() {

    let classList = [];
    let subjectList = [];
    $('input[name="classroom[]"]').each(function () {
        if($(this).prop('checked')){
            classList.push($(this).val());
        }
    });
    $('input[name="subject[]"]').each(function () {
        if($(this).prop('checked')){
            subjectList.push($(this).val());
        }
    });
   
    if(classList.length && subjectList.length){
        return true;
    }
    
    $('.message-class-subject').removeClass('d-none');
    return false;
}