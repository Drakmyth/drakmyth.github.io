function ShowCommentForm() {
    $('.slider').addClass('active');
    $('.comment-form>button')[0].disabled = true;
    $("#leave-comment").submit(OnSubmitComment);
}

function CaptchaCallback(responseToken) {
    $('#submitButton')[0].disabled = false;
}

function OnSubmitComment(event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission

    var commentThanks = $('.comment-thanks');
    
    // TODO: Start Spinner

    $.ajax({
        url : post_url,
        type: request_method,
        data : form_data,
        error: function (err) {
            commentThanks.text('Uh oh! Something went wrong submitting your comment. Please refresh the page and try again.');
            commentThanks.addClass('errorText');
        }
    }).done(function(response){
        // TODO: End Spinner
    });

    $('.slider').removeClass('active');
    commentThanks.removeClass('hidden');
}