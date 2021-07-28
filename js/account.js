$(document).ready(function () {
    $("#password-field").after('<i class="far fa-eye" id="eye_slash"></i>');

    $("#eye_slash").click(function () {
        if ($(this).hasClass("far fa-eye-slash")) {
            $(this).removeClass("far fa-eye-slash");
            $(this).addClass("far fa-eye");
            $("#password-field").attr("type", "password");
            $("#cnf_password-field").attr("type", "password");
        } else {
            $(this).removeClass("far fa-eye");
            $(this).addClass("far fa-eye-slash");
            $("#password-field").attr("type", "text");
            $("#cnf_password-field").attr("type", "text");
        }
    });
});
