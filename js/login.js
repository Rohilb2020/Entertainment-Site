$(document).ready(function () {
    $("#admin_btn").click(function () {
        $("#user-login").slideUp();
        $("#admin_login").slideDown();
        $("#color_button").css("left", "50%");
        $("#user_btn").css("color", "black");
        $("#admin_btn").css("color", "white");
        $(".form_container").css({
            "box-shadow": "-15px -20px #333333",
            "background-color": "#F0F0F0",
        });
        $(".login_btn").css("color", "white");
        $("input").css("color", "black");
    });
    $("#user_btn").click(function () {
        $("#admin_login").slideUp();
        $("#user-login").slideDown();
        $("#color_button").css("left", "0");
        $("#admin_btn").css("color", "white");
        $("#user_btn").css("color", "black");
        $(".form_container").css({
            "box-shadow": "-10px -15px  #F0F0F0",
            "background-color": "#333333",
        });
        $(".login_btn").css("color", "black");
        $("input").css("color", "white");
    });
    $("#password-field").after('<i class="far fa-eye" id="eye_slash"></i>');
    $("#admin_password-field").after(
        '<i class="far fa-eye" id="admin_eye_slash"></i>'
    );
    $("#eye_slash").click(function () {
        if ($(this).hasClass("far fa-eye-slash")) {
            $(this).removeClass("far fa-eye-slash");
            $(this).addClass("far fa-eye");
            $("#password-field").attr("type", "password");
        } else {
            $(this).removeClass("far fa-eye");
            $(this).addClass("far fa-eye-slash");
            $("#password-field").attr("type", "text");
        }
    });
    $("#admin_eye_slash").click(function () {
        if ($(this).hasClass("far fa-eye-slash")) {
            $(this).removeClass("far fa-eye-slash");
            $(this).addClass("far fa-eye");
            $("#admin_password-field").attr("type", "password");
        } else {
            $(this).removeClass("far fa-eye");
            $(this).addClass("far fa-eye-slash");
            $("#admin_password-field").attr("type", "text");
        }
    });

    /*alert box for validation */

    var user_validate = function () {
        var email = $("#username").val();
        var pass = $("#password-field").val();
        if (email == null || email == "" || pass == null || pass == "") {
            event.preventDefault();
            // alert("Both fields must be filled");
            $.alert({
                title: "Dear User,",
                content: "Both fields must be filled!",
                typeAnimated: true,
                type: "orange",
                boxWidth: "300px",
                useBootstrap: false,

                buttons: {
                    OK: {
                        text: "OK",
                        btnClass: "btn-orange",
                        action: function () {
                            close();
                        },
                    },
                },
                icon: "fa fa-warning",
                draggable: false,
            });
            return;
        } else if (email.indexOf("@") == -1) {
            event.preventDefault();
            // alert("Email address must contain @");
            $.alert({
                title: "Dear User,",
                content: "Email address must contain @",
                typeAnimated: true,
                type: "orange",
                boxWidth: "300px",
                useBootstrap: false,

                buttons: {
                    OK: {
                        text: "OK",
                        btnClass: "btn-orange",
                        action: function () {
                            close();
                        },
                    },
                },
                icon: "fa fa-warning",
                draggable: false,
            });
            return;
        }
    };
    var admin_validate = function () {
        var email = $("#admin_username").val();
        var pass = $("#admin_password-field").val();
        if (email == null || email == "" || pass == null || pass == "") {
            event.preventDefault();
            // alert("Both fields must be filled sd");
            // return;
            $.alert({
                title: "Dear Admin,",
                content: "Both fields must be filled!",
                typeAnimated: true,
                type: "orange",
                boxWidth: "300px",
                useBootstrap: false,

                buttons: {
                    OK: {
                        text: "OK",
                        btnClass: "btn-orange",
                        action: function () {
                            close();
                        },
                    },
                },
                icon: "fa fa-warning",
                draggable: false,
                theme: "dark",
            });
            return;
        } else if (email.indexOf("@") == -1) {
            event.preventDefault();
            // alert("Email address must contain @");
            $.alert({
                title: "Dear Admin,",
                content: "Email address must contain @",
                typeAnimated: true,
                type: "orange",
                boxWidth: "300px",
                useBootstrap: false,

                buttons: {
                    OK: {
                        text: "OK",
                        btnClass: "btn-orange",
                        action: function () {
                            close();
                        },
                    },
                },
                icon: "fa fa-warning",
                draggable: false,
                theme: "dark",
            });
            return;
        }
    };

    $("#user_submit").click(function () {
        user_validate();
    });
    $("#admin_submit").click(function () {
        admin_validate();
    });
});
