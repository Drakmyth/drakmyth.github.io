function ShowCommentForm() {
    $('.slider').addClass('active');
    $('.comment-form>button')[0].disabled = true;
}

function CaptchaCallback(responseToken) {
    $('#submitButton')[0].disabled = false;
}

function OnSubmitComment() {
    $('.slider').removeClass('active');
    $('.comment-thanks').removeClass('hidden');
}