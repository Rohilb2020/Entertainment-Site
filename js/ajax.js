//
const key = config.MY_API_KEY;

$(document).ready(function () {
    if ($("#movie").val() == null || $("#movie").val() == "") {
        $("#movies_tab").html(
            `<p class="blank_input">Type to search for movies</p>`
        );
        $("#tv_tab").html(
            `<p class="blank_input" >Type to search for tv shows and series</p>`
        );
    }
    var count = 0;

    /* ajax api call */
    /*movies and tv show search (till line 94)*/
    $("#movie").keyup(function () {
        var request_data = $("#movie").val();
        // console.log(request_data);
        if (request_data == null || request_data == "") {
            $("#movies_tab").html(
                `<p class="blank_input">Type to search for movies</p>`
            );
            $("#tv_tab").html(
                `<p class="blank_input">Type to search for tv shows and series</p>`
            );
        }

        $.ajax({
            dataType: "json",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
            method: "get",
            data: {
                query: request_data,
            },
            success: function (responses) {
                // count = count + 1;
                // $.each(responses, function(i, response) {
                //     console.log(response);
                //     $("#result").append('<img style= "border-radius:15px; display:inline-block;margin:10px; transition:0.5s;"  width="200px" height="300px" src="https://image.tmdb.org/t/p/w500' + responses.poster_path + '">');
                //     $("#result").append("<p>" + JSON.stringify(name) + "<p>");
                // });
                let output = "";
                $.each(responses.results, function (i, response) {
                    // console.log("Key=" +API_KEY);
                    console.log(response);
                    console.log(`Name: ${response.title} Id: ${response.id}`);
                    if (response.poster_path == null) {
                        output += `<div class="movie_posters_conatiner"><img  class="movie_posters" 
                        id="${response.id}" src="images/no_poster_img.jpg" title="${response.title}" ></div>`;
                    } else {
                        output += `<div class="movie_posters_conatiner"><img class="movie_posters"  id="${response.id}"src="https://image.tmdb.org/t/p/w500${response.poster_path}" title="${response.title}"></div>`;
                    }
                    // $("#result").html('<img style= "border-radius:15px; display:inline-block;margin:10px; transition:0.5s;"  width="200px" height="300px" src="https://image.tmdb.org/t/p/w500' + response.poster_path + '">');
                    // $("#result").append("<p>" + JSON.stringify(response.w500_name) + "<p>");
                });

                $("#movies_tab").html(output);

                // $("#result").append('<img style= "border-radius:15px; display:inline-block;margin:10px; transition:0.5s;"  width="200px" height="300px" src="https://image.tmdb.org/t/p/w500' + responses.results[0].poster_path + '">');
                // $("#result").append("<p>" + JSON.stringify(responses) + "<p>");

                // });
                // console.log(responses.results[0]);
            },
            // error: function(jqXHR, textStatus, errorThrown) {
            //     alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
            //     $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');

            // }
            error: function (error) {
                console.log(error);
            },
        });
        $.ajax({
            dataType: "json",
            url: `https://api.themoviedb.org/3/search/tv?api_key=${key}`,
            method: "get",
            data: {
                query: request_data,
            },
            success: function (responses) {
                let output_02 = "";
                $.each(responses.results, function (i, response) {
                    // console.log(response);
                    console.log(`Name: ${response.title} Id: ${response.id}`);
                    if (response.poster_path == null) {
                        output_02 += `<div class="movie_posters_conatiner"><img  class="movie_posters" 
                        id="${response.id}" src="images/no_poster_img.jpg" title="${response.title}"></div>`;
                    } else {
                        output_02 += `<div class="movie_posters_conatiner"><img class="movie_posters" id="${response.id}" src="https://image.tmdb.org/t/p/w500${response.poster_path}" title="${response.name}"></div>`;
                    }
                });
                $("#tv_tab").html(output_02);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    $("#tabs").tabs();
    $("#movies_tab").on("click", "img", function () {
        movie_id = $(this).attr("id");
        console.log(movie_id);
        $.ajax({
            dataType: "json",
            url: `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=en-US`,
            method: "get",
            success: function (data) {
                var output_backdrop = "";
                var output_cast = "";
                let output_movie = "";
                let output_genre = "";
                let rating = "";
                $.each(data.genres, function (i, genre) {
                    // console.log(genre);
                    output_genre += `<span class="genre_name">${genre.name}</span>&nbsp&nbsp`;
                });

                if (data.adult != false) {
                    rating = `<span class="movie_rating">A(18+)<span>`;
                } else {
                    rating = `<span class="movie_rating">UA(13+)<span>`;
                }
                // console.log(data);
                if (data.backdrop_path == "" || data.backdrop_path == null) {
                    output_movie = `<div class="cover_image_container"><img class="cover_img" src="images/no_cover_image.jpg" style = "height:375px"><div class="box-shadow"></div></div><div class="movie_details"><p class="movie_name">${data.title}
                </p><button class="add_list_icon"><i class="far fa-plus-square"></i></button><p class="p_movie_details"><span class="span_movie_details_headings">Synopsis</span><br><br> ${data.overview} </p><br><p class="p_movie_details"><span class="span_movie_details_headings">Genre:  </span>${output_genre}</p><br><p class="p_movie_details"><span class="span_movie_details_headings">Rating:  </span> ${rating}</p><br><span class="span_movie_details_headings">Cast</span><ul class="cast"></ul><span class="span_movie_details_headings">Backdrops</span><div class="backdrops"></div></div><i class="fas fa-times" id="cross_icon"></i>`;
                } else {
                    output_movie = `<div class="cover_image_container"><img class="cover_img" src="https://image.tmdb.org/t/p/w500${data.backdrop_path}"><div class="box-shadow"></div></div><div class="movie_details"><p class="movie_name">${data.title}
                </p><form class="form_movie_info"><input type="hidden" value="${movie_id}" name="mov_id"><input type="hidden" value="https://image.tmdb.org/t/p/w500${data.poster_path}" name="movie_url"><input type="hidden" value="${data.title}" name="movie_title"><button class="add_list_icon"><i class="far fa-plus-square"></i></button></form><p class="p_movie_details"><span class="span_movie_details_headings">Synopsis</span><br><br> ${data.overview} </p><br><p class="p_movie_details"><span class="span_movie_details_headings">Genre:  </span>${output_genre}</p><br><p class="p_movie_details"><span class="span_movie_details_headings">Rating:  </span> ${rating}</p><br><span class="span_movie_details_headings">Cast</span><ul class="cast"></ul><span class="span_movie_details_headings">Backdrops</span><div class="backdrops"></div></div><i class="fas fa-times" id="cross_icon"></i>`;
                }
                $(".movies_info").html(output_movie);
                $(".movies_info").css("display", "none");
                $(".movies_info").slideDown();
                $("body").css("overflow", "hidden");
                $.ajax({
                    dataType: "json",
                    method: "get",
                    url: `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=en-US&append_to_response=images&include_image_language=en,null`,
                    success: function (data) {
                        // console.log(data);
                        $.each(data.images.backdrops, function (i, backdrop) {
                            // console.log(backdrop.file_path);
                            output_backdrop += `<div><img style= "border-radius:15px; display:inline-block; transition:0.5s;"  width="400" height="225"  class="movie_backdrop" src="https://image.tmdb.org/t/p/w500${backdrop.file_path}"></div>`;
                        });
                        $(".backdrops").html(output_backdrop);
                        $(".backdrops").slick({
                            dots: false,
                            arrows: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: true,
                            autoplaySpeed: 2000,
                            infinite: true,
                            cssEase: "linear",
                        });
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
                $.ajax({
                    dataType: "json",
                    method: "get",
                    url: `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${key}&language=en-US`,
                    success: function (data) {
                        // console.log(data);
                        $.each(data.cast, function (i, role) {
                            if (role.profile_path == null) {
                                output_cast += `<li class="cast_list">
                            <img style= "display:inline; transition:0.5s;" width ="138" height="185" class="profile_pics" src="images/no_photo_img.jpg"><div class="char_description"><div class="name">${role.name}</div><div class="characters">${role.character}</div></div>          
                             </li>`;
                            } else {
                                output_cast += `<li class="cast_list">
                            <img style= "display:inline; transition:0.5s;" width ="138" height="185" class="profile_pics" src="https://image.tmdb.org/t/p/w500${role.profile_path}"><div class="char_description"><div class="name">${role.name}</div><div class="characters">${role.character}</div></div>          
                             </li>`;
                            }

                            return i < 14;
                        });
                        // if ($("#cast").is(":empty")) {
                        //     $("#cast").css("overflow-x", "hidden");
                        // } else {
                        //     $("#cast").css("overflow-x", "scroll");
                        // }
                        $(".cast").html(output_cast);
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    // on function since its a click action on a dynamicaaly generated content

    $(".movies_info").on("click", "#cross_icon", function () {
        // console.log("slideUp");
        $(".movies_info").slideUp();
        $("body").css("overflow", "visible");
    });

    /********* TV TAB ********/
    $("#tv_tab").on("click", "img", function () {
        tv_id = $(this).attr("id");
        console.log(tv_id);
        $.ajax({
            dataType: "json",
            url: `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${key}&language=en-US`,
            method: "get",
            success: function (data) {
                var output_backdrop_tv = "";
                var output_cast_tv = "";
                let output_tv = "";
                let output_genre_tv = "";
                let rating_tv = "";
                $.each(data.genres, function (i, genre) {
                    // console.log(genre);
                    output_genre_tv += `<span class="genre_name">${genre.name}</span>&nbsp&nbsp`;
                });

                if (data.adult != false) {
                    rating_tv = `<span class="movie_rating">A(18+)<span>`;
                } else {
                    rating_tv = `<span class="movie_rating">UA(13+)<span>`;
                }
                // console.log(data);
                if (data.backdrop_path == "" || data.backdrop_path == null) {
                    output_tv = `<div class="cover_image_container"><img class="cover_img" src="images/no_cover_image.jpg" style = "height:375px"><div class="box-shadow"></div></div><div class="movie_details"><p class="movie_name">${data.name}
                </p><p class="p_movie_details"><span class="span_movie_details_headings">Synopsis</span><br><br> ${data.overview} </p><br><p class="p_movie_details"><span class="span_movie_details_headings">Genre:  </span>${output_genre_tv}</p><br><p class="p_movie_details"><span class="span_movie_details_headings">Rating:  </span> ${rating_tv}</p><br><span class="span_movie_details_headings">Cast</span><ul class="cast"></ul><span class="span_movie_details_headings">Backdrops</span><div class="backdrops_tv"></div></div><i class="fas fa-times" id="cross_icon"></i>`;
                } else {
                    output_tv = `<div class="cover_image_container"><img class="cover_img" src="https://image.tmdb.org/t/p/w500${data.backdrop_path}"><div class="box-shadow"></div></div><div class="movie_details"><p class="movie_name">${data.name}
                </p><p class="p_movie_details"><span class="span_movie_details_headings">Synopsis</span><br><br> ${data.overview} </p><br><p class="p_movie_details"><span class="span_movie_details_headings">Genre:  </span>${output_genre_tv}</p><br><p class="p_movie_details"><span class="span_movie_details_headings">Rating:  </span> ${rating_tv}</p><br><span class="span_movie_details_headings">Cast</span><ul class="cast"></ul><span class="span_movie_details_headings">Backdrops</span><div class="backdrops_tv"></div></div><i class="fas fa-times" id="cross_icon"></i>`;
                }
                $(".tv_info").html(output_tv);
                $(".tv_info").css("display", "none");
                $(".tv_info").slideDown();
                $("body").css("overflow", "hidden");
                $.ajax({
                    dataType: "json",
                    method: "get",
                    url: `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${key}&language=en-US&append_to_response=images&include_image_language=en,null`,
                    success: function (data) {
                        // console.log(data);
                        $.each(data.images.backdrops, function (i, backdrop) {
                            // console.log(backdrop.file_path);
                            output_backdrop_tv += `<div><img style= "border-radius:15px; display:inline-block; transition:0.5s;"  width="400" height="225"  class="movie_backdrop" src="https://image.tmdb.org/t/p/w500${backdrop.file_path}"></div>`;
                        });
                        $(".backdrops_tv").html(output_backdrop_tv);
                        $(".backdrops_tv").slick({
                            dots: false,
                            arrows: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: true,
                            autoplaySpeed: 2000,
                            infinite: true,
                            cssEase: "linear",
                        });
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });

                // credits
                $.ajax({
                    dataType: "json",
                    method: "get",
                    url: `https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=${key}&language=en-US`,
                    success: function (data) {
                        console.log(data);
                        $.each(data.cast, function (i, role) {
                            if (role.profile_path == null) {
                                output_cast_tv += `<li class="cast_list">
                            <img style= "display:inline; transition:0.5s;" width ="138" height="185" class="profile_pics" src="images/no_photo_img.jpg"><div class="char_description"><div class="name">${role.name}</div><div class="characters">${role.character}</div></div>          
                             </li>`;
                            } else {
                                output_cast_tv += `<li class="cast_list">
                            <img style= "display:inline; transition:0.5s;" width ="138" height="185" class="profile_pics" src="https://image.tmdb.org/t/p/w500${role.profile_path}"><div class="char_description"><div class="name">${role.name}</div><div class="characters">${role.character}</div></div>          
                             </li>`;
                            }

                            return i < 14;
                        });
                        // if ($("#cast").is(":empty")) {
                        //     $("#cast").css("overflow-x", "hidden");
                        // } else {
                        //     $("#cast").css("overflow-x", "scroll");
                        // }
                        $(".cast").html(output_cast_tv);
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    $(".tv_info").on("click", "#cross_icon", function () {
        // console.log("slideUp");
        $(".tv_info").slideUp();
        $("body").css("overflow", "visible");
    });
});
