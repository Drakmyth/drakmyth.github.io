function ShowCommentForm() {
    $('.slider').addClass('active');
    $('.comment-form>button')[0].disabled = true;
    $("#leave-comment").submit(OnSubmitComment);
}

function CaptchaCallback(responseToken) {
    $('#submitButton')[0].disabled = false;
}

function OnSubmitComment(event) {
    $('#submitButton')[0].disabled = true;
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission

    var commentThanks = $('.comment-thanks');
    
    // TODO: Start Spinner
    $(this).find(':input').prop('disabled', true);
    $('.spinner').removeClass('hidden');

    $.ajax({
        url : post_url,
        type: request_method,
        data : form_data,
        success: function(data) {
            commentThanks.text('Thank you! Your comment has been submitted for review. Once approved, it will appear below.');
        },
        error: function (err) {
            commentThanks.text('Uh oh! Something went wrong submitting your comment. Please refresh the page and try again.');
            commentThanks.addClass('errorText');
        }
    }).done(function(response){
        // TODO: End Spinner
        $('.spinner').addClass('hidden');
        $('.slider').removeClass('active');
        commentThanks.removeClass('hidden');
    });
}