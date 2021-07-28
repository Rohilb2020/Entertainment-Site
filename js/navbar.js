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
    $(window).scroll(function () {
        stickynav();
        solidnav();
        mobnav();
    });
});
