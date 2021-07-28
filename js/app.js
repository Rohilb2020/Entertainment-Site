$(document).ready(function () {
    $(".navbar a").click(function () {
        $(".navbar a").removeClass("active");
        $(this).addClass("active");
    });

    var height = $(".navbar").offset().top; //position from the top
    var stickynav = function () {
        var scrolltop = $(window).scrollTop(); //length scrolled from the top
        // console.log(scrolltop);
        if (scrolltop > height) {
            $(".navbar").addClass("sticky");
            $(".active").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
            $(".active").removeClass("sticky");
        }
    };

    var solidnav = function () {
        var scrolltop = $(window).scrollTop();
        if (scrolltop > height + 40) {
            $(".navbar").addClass("solid");
            $(".navbar a").addClass("solid_links");
            $(".reel").addClass("solid_logo");
            $("a.active").addClass("no_content");
        } else {
            $(".navbar").removeClass("solid");
            $(".navbar a").removeClass("solid_links");
            $(".reel").removeClass("solid_logo");
            $("a.active").removeClass("no_content");
        }
    };

    var mobnav = function () {
        var scrolltop = $(window).scrollTop();
        if (scrolltop > height) {
            $(".navbar").addClass("sticky");
            $(".navbar.responsive a").addClass(".sticky_mobnav");
        } else {
            $(".navbar").removeClass("sticky");
            $(".navbar.responsive a").removeClass(".sticky_mobnav");
        }
    };
    mobnav();
    stickynav();

    var collapsiblenavbar = function () {
        $(".icon").click(function () {
            // console.log("click");
            // $("nav").toggleClass("responsive"); //adding and removing a class on click
            if ($("nav").hasClass("responsive")) {
                $("nav").removeClass("responsive");
            } else {
                $("nav").addClass("responsive");
            }
        });
    };

    collapsiblenavbar();
    $(".icon").click(function () {
        // console.log("show");
        if ($("nav").hasClass("responsive")) {
            // $("a").hide();
            // $("a").css("opacity", "0.5");
            // e.stopPropagation();
            // $("a").slideDown("slow");
            // $("a").show("slow");
            $("a").animate(
                {
                    opacity: 1,
                },
                50,
                function () {}
            );
        } else {
            $("a").animate(
                {
                    opacity: 1,
                },
                0,
                function () {}
            );
        }
    });
    var text_visible = function () {
        var coord = [];
        var i;
        var j;
        var height;
        for (i = 1; i < 5; i++) {
            height = $("#intro_0" + i)
                .parent()
                .offset().top;
            coord.push(height);
        }
        var scrolltop;
        for (i = 1; i < 5; i++) {
            // console.log(scrolltop);
            // console.log($(document).height());
            scrolltop = $(window).scrollTop();
            j = i - 1;
            if (coord[j] < scrolltop + 100) {
                $("#intro_0" + i).addClass("intro-text_visible");
            }
            if (
                Math.ceil($(window).height() + scrolltop) >=
                $(document).height()
            ) {
                $("#intro_01").addClass("intro-text_visible");
                $("#intro_02").addClass("intro-text_visible");
                $("#intro_03").addClass("intro-text_visible");
                $("#intro_04").addClass("intro-text_visible");
            }
        }
        // console.log(
        //     Math.ceil($(window).height() + scrolltop) +
        //         " : " +
        //         $(document).height()
        // );
    };
    var flexbox_visible = function () {
        var coord = [];
        var i;
        var j;
        var height;
        for (i = 1; i < 5; i++) {
            height = $("#flexbox_0" + i).offset().top;
            coord.push(height);
        }
        var scrolltop;
        for (i = 1; i < 5; i++) {
            // console.log(scrolltop);
            // console.log($(document).height());
            scrolltop = $(window).scrollTop();
            j = i - 1;
            if ($(window).width() < 900) {
                if (coord[j] < scrolltop + 350) {
                    $("#flexbox_0" + i).addClass("flexbox_visible");
                }
            } else {
                if (coord[j] < scrolltop + 500) {
                    $("#flexbox_0" + i).addClass("flexbox_visible");
                }
            }
            if (
                Math.ceil($(window).height() + scrolltop) >=
                $(document).height()
            ) {
                $("#intro_01").addClass("intro-text_visible");
                $("#intro_02").addClass("intro-text_visible");
                $("#intro_03").addClass("intro-text_visible");
                $("#intro_04").addClass("intro-text_visible");
            }
        }
        // console.log(
        //     Math.ceil($(window).height() + scrolltop) +
        //         " : " +
        //         $(document).height()
        // );
    };

    /*get started phrase*/
    var phrase_animation = function () {
        var scrolltop;
        var height;
        scrolltop = $(window).scrollTop();
        height = $(".get_started").offset().top;
        if (scrolltop + 250 > height) {
            $(".get_started").addClass("get_started_visible");
        } else if (
            Math.ceil($(window).height() + scrolltop) >= $(document).height()
        ) {
            $(".get_started").addClass("get_started_visible");
        }
    };

    phrase_animation();
    text_visible();
    flexbox_visible();
    $(window).scroll(function () {
        stickynav();
        solidnav();
        mobnav();
        text_visible();
        flexbox_visible();
        phrase_animation();
    });

    //run this function everytime when scrolling

    $(".carousel_conatiner").slick({
        dots: true,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        cssEase: "linear",
    });

    //carousel using slick plugin

    //resize function runs when a browser window is resized
    // $(window).on("resize", function () {
    // var breadth = $(this);
    //     mobilenavbar();
    // });
});

// function intro_text_visible(){
//     var intro_text = document.querySelector('.intro-text_left');
//     var textheight = intro_text.getBoundingClientRect().top;
//     var screenpos = window.innerHeight;

//     if(textheight < screenpos){
//         intro_text.classList.add()
//     }
// }
