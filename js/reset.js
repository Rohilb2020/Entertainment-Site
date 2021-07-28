$(document).ready(function () {
    $("#password-field").after('<i class="far fa-eye" id="eye_slash"></i>');
    $("#eye_slash").click(function () {
        if ($(this).hasClass("far fa-eye-slash")) {
            $(this).removeClass("far fa-eye-slash");
            $(this).addClass("far fa-eye");
            $(".pwd").attr("type", "password");
        } else {
            $(this).removeClass("far fa-eye");
            $(this).addClass("far fa-eye-slash");
            $(".pwd").attr("type", "text");
        }
    });
});
