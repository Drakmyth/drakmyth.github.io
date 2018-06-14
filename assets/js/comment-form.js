function ToggleCommentForm() {
    $('.slider').toggleClass('active');
    var button = $('.comment-form>button')[0];
    button.disabled = !button.disabled;
}