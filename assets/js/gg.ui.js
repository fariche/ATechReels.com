(function ($) {
    "use strict";
    $(window).resize(function () { loadTwitterSlider(); window.setHeight(); });


    $(window).load(function () { // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({ 'overflow': 'visible' });

        if (!show_styleswitcher) {
            strokeStyleColor = window.getComputedStyle(document.getElementById('init-canvas'), null).color;
            loadCanvasTimer(fillStyleColor, strokeStyleColor);
        }
    });

    $(document).ready(function () {
        $('.twitterfeed').tweet({
            modpath: 'assets/twitter/',
            count: tweets_count,
            username: twitter_username,
            loading_text: 'loading twitter feed...',
            template: "{join}{text}{time}",
            retweets: false
        });
        hide_bgs();
        
        if (show_slider) {
            load_bgslider();
        }
        if (show_video) {
            load_bgvideo();
        }
        if (show_fixedbg) {
            $('#bg-image').show();
        }

        $('.social a').tooltip();

        if (!$.browser.mobile) {
            $('html').niceScroll({ scrollspeed: 200 });
        }
    });

    $('#counter').countdown({
        finalDate: countdown_timer
    });
    
    window.loadCanvasTimer = function(fillStyleColor, strokeStyleColor) {
        $("#canvas-days").drawArc({
            layer: true,
            name: 'base',
            fillStyle: fillStyleColor,
            strokeWidth: 25,
            x: 75, y: 75,
            radius: 40,
            start: 0, end: 360,
            inDegrees: true
        });
        $("#canvas-days").drawArc({
            layer: true,
            name: 'timer',
            strokeStyle: strokeStyleColor,
            strokeWidth: 20,
            x: 75, y: 75,
            radius: 52,
            start: 0, end: 360,
            inDegrees: true
        });

        $("#canvas-hours").drawArc({
            layer: true,
            name: 'base',
            fillStyle: fillStyleColor,
            strokeWidth: 25,
            x: 75, y: 75,
            radius: 40,
            start: 0, end: 360,
            inDegrees: true
        });
        $("#canvas-hours").drawArc({
            layer: true,
            name: 'timer',
            strokeStyle: strokeStyleColor,
            strokeWidth: 20,
            x: 75, y: 75,
            radius: 52,
            start: 0, end: 360,
            inDegrees: true
        });

        $("#canvas-minutes").drawArc({
            layer: true,
            name: 'base',
            fillStyle: fillStyleColor,
            strokeWidth: 25,
            x: 75, y: 75,
            radius: 40,
            start: 0, end: 360,
            inDegrees: true
        });
        $("#canvas-minutes").drawArc({
            layer: true,
            name: 'timer',
            strokeStyle: strokeStyleColor,
            strokeWidth: 20,
            x: 75, y: 75,
            radius: 52,
            start: 0, end: 360,
            inDegrees: true
        });

        $("#canvas-seconds").drawArc({
            layer: true,
            name: 'base',
            fillStyle: fillStyleColor,
            strokeWidth: 25,
            x: 75, y: 75,
            radius: 40,
            start: 0, end: 360,
            inDegrees: true
        });
        $("#canvas-seconds").drawArc({
            layer: true,
            name: 'timer',
            strokeStyle: strokeStyleColor,
            strokeWidth: 20,
            x: 75, y: 75,
            radius: 52,
            start: 0, end: 360,
            inDegrees: true
        });
    }

    window.setHeight = function() {
        var headerHeight = $('#header').height()
        var windowHeight = $(window).height();

        var setPadding = windowHeight > headerHeight ? (windowHeight - headerHeight) / 2 : 0;
        $('#header').css({ 'padding': setPadding + 'px 0' });

        $('#bg-image').height(0);
        $('#bg-image').height($(window).height());
        $('#bg-pattern').height(0);
        $('#bg-pattern').height($(document).height());

        $('#bg-pattern .splines').each(function () { $(this).remove(); });
    }

    setInterval(function () {
        var windowHeight = $('#header').outerHeight();
        var windowWidth = $(window).width() - 20;
        $('<div class="splines"></div>').css({
            width: (Math.random() * 5) + 'px',
            height: windowHeight,
            background: 'rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            top: 0,
            left: Math.random() * windowWidth
        })
            .appendTo('#bg-pattern')
            .fadeIn()
            .animate({ left: windowWidth }, 20000, 'linear', function () {
                $(this).fadeOut(5000).remove()
            });
    }, 2000
    );

    setInterval(function () {
        var windowHeight = $('#header').outerHeight();
        var windowWidth = $(window).width() - 20;
        $('<div class="splines"></div>').css({
            width: (Math.random() * 5) + 'px',
            height: windowHeight,
            background: 'rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            top: 0,
            left: Math.random() * windowWidth
        })
            .appendTo('#bg-pattern')
            .fadeIn()
            .animate({ left: 0 }, 20000, 'linear', function () {
                $(this).fadeOut(5000).remove()
            });
    }, 3000
    );

    $(window).load(function () {
        loadTwitterSlider();
    });

    function loadTwitterSlider() {
        $('.twitterfeed').flexslider({
            selector: ".slides > li",
            animation: "slide",
            easing: "easeInBack",
            useCSS: false,
            direction: "vertical",
            directionNav: false,
            slideshowSpeed: 2000,
            pauseOnHover: true,
            start: function (slider) {
                var slideHeight = [];
                slider.find('.slides > li').each(function () {
                    slideHeight.push($(this).height());
                });

                var slideHeightSorted = slideHeight.sort(function (a, b) { return b - a });
                var sliderHeight = slideHeightSorted[0];
                slider.height(sliderHeight);
                slider.find('.flex-viewport').css({ height: sliderHeight });
                slider.find('.slides > li').each(function () {
                    $(this).height(sliderHeight);
                });
                window.setHeight();
            }
        });
    }

    function hide_bgs() {
        $('#progress-back').hide();
        $('#supersized-loader').hide();
        $('#supersized').hide();
        $('#bg-image').hide();
    }

    function load_bgslider() {
        $('#progress-back').show();
        $('#supersized-loader').show();
        $('#supersized').show();
        $.supersized({
            slide_interval: 10000,
            transition: 1,
            transition_speed: 1000,
            slide_links: 'blank',
            slides: slides_array
        });
    }


    function extract_youtubeID(url) {
        var youtube_id;
        youtube_id = url.replace(/^[^v]+v.(.{11}).*/, "$1");
        return youtube_id;
    }

    function load_bgvideo() {
        $('#bg-video').mb_YTPlayer({
            videoURL: youtube_video_url,
            containment: 'body',
            mute: true,
            showControls: false,
            loop: true,
            autoplay: true,
            showYTLogo: false,
            realfullscreen: true
        });
    }
})(jQuery);