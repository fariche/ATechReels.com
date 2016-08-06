(function ($) {
    "use strict";
    $(window).resize(function () { window.setHeight(); });

    if (!$.browser.mobile) {
        $('#nav-scroll li').tooltip();
    }

    $('#nav-scroll a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
        $(this).on('shown.bs.tab', function (e) {
            window.setHeight();
        })
        $('#header .splines').each(function () { $(this).remove(); });
    })

    var nt_title = $('#nt-title').newsTicker({
        row_height: 40,
        max_rows: 1,
        duration: 3000,
        pauseOnHover: 0
    });

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
        $('#nav-scroll').on('show.bs.collapse', function () {
            $(this).hide(0);
            $('#nav-slider').animate({ 'left': '-60px' }, 'slow');
            $('#wrapper_mbYTP_bg-video').animate({ 'left': '-60px' }, 'slow');
            $('#supersized img').animate({ 'left': '-60px' }, 'slow');
            $('#bg-image').animate({ 'left': '-60px' }, 'slow');
            $(this).show('slow');
        });
        $('#nav-scroll').on('hide.bs.collapse', function () {
            $(this).show(0);
            $('#nav-slider').animate({ 'left': '0px' }, 'slow');
            $('#wrapper_mbYTP_bg-video').animate({ 'left': '0px' }, 'slow');
            $('#supersized img').animate({ 'left': '0px' }, 'slow');
            $('#bg-image').animate({ 'left': '0px' }, 'slow');
            $(this).hide('slow');
        });
        $(window).resize(function () {
            $('#nav-slider').css({ 'left': '0px' });
            $('#nav-scroll').removeClass('in');
            $('#nav-scroll').hide(0);
        });

        $('.twitterfeed').tweet({
            modpath: 'assets/twitter/',
            count: tweets_count,
            username: twitter_username,
            loading_text: 'loading twitter feed...',
            template: "{join}{text}{time}",
            retweets: true
        });

        new WOW().init();
        
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

    window.setHeight = function () {

        var active_panel = '';
        if ($('#header-panel').hasClass('active')) {
            active_panel = $('#header-panel');
        }
        else if ($('#subscribe-panel').hasClass('active')) {
            active_panel = $('#subscribe-panel');
        }
        else if ($('#about-panel').hasClass('active')) {
            active_panel = $('#about-panel');
        }
        else if ($('#services-panel').hasClass('active')) {
            active_panel = $('#services-panel');
        }
        else if ($('#contact-panel').hasClass('active')) {
            active_panel = $('#contact-panel');
        }

        $('#header-panel').addClass('in active');
        $('#subscribe-panel').addClass('in active');
        $('#about-panel').addClass('in active');
        $('#services-panel').addClass('in active');
        $('#contact-panel').addClass('in active');
        var headerHeight = $('#header').height()
        var subscribeHeight = $('#subscribe > .pattern-dark').height()
        var aboutHeight = $('#about > .pattern-dark').height()
        var servicesHeight = $('#services > .pattern-dark').height()
        var contactHeight = $('#contact > .pattern-dark').height()
        var windowHeight = $(window).height();
        loadTwitterSlider();
        $('#subscribe-panel').removeClass('in active');
        $('#about-panel').removeClass('in active');
        $('#services-panel').removeClass('in active');
        $('#contact-panel').removeClass('in active');
        $('#header-panel').removeClass('in active');

        active_panel.addClass('in active');
        
        var setPadding = windowHeight > headerHeight ? (windowHeight - headerHeight) / 2 : 0;
        $('#header').css({ 'padding': setPadding + 'px 0' });
        setPadding = windowHeight > subscribeHeight ? (windowHeight - subscribeHeight) / 2 : 0;
        $('#subscribe > .pattern-dark').css({ 'padding': setPadding + 'px 0' });
        setPadding = windowHeight > aboutHeight ? (windowHeight - aboutHeight) / 2 : 0;
        $('#about > .pattern-dark').css({ 'padding': setPadding + 'px 0' });
        setPadding = windowHeight > servicesHeight ? (windowHeight - servicesHeight) / 2 : 0;
        $('#services > .pattern-dark').css({ 'padding': setPadding + 'px 0' });
        setPadding = windowHeight > contactHeight ? (windowHeight - contactHeight) / 2 : 0;
        $('#contact > .pattern-dark').css({ 'padding': setPadding + 'px 0' });
        
        $('#bg-image').height(0);
        $('#bg-image').height($(window).height());
        $('#bg-pattern').height(0);
        $('#bg-pattern').height(active_panel.height());
        $('#nav-scroll').height(0);
        $('#nav-scroll').height(active_panel.height());
        
        $('#header .splines').each(function () { $(this).remove(); });
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
            .appendTo('#header')
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
            .appendTo('#header')
            .fadeIn()
            .animate({ left: 0 }, 20000, 'linear', function () {
                $(this).fadeOut(5000).remove()
            });
    }, 3000
    );

    function loadTwitterSlider() {
        $('.twitterfeed').flexslider({
            selector: ".slides > li",
            animation: "slide",
            easing: "easeInBack",
            useCSS: false,
            directionNav: false,
            slideshowSpeed: 2000,
            pauseOnHover: true,
            direction: "vertical"
        });
    }

    $(window).load(function () {
        window.setHeight();
    });

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