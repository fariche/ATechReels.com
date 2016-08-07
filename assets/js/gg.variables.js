// global variables for the template ui
if (validateParameters()) {
    // set twitter username for tweets slider section
    var twitter_username = 'gigagit';

    // set tweets count
    var tweets_count = 3;

    // set countdown timer date-time
    // DD MMMM YYYY, hh:mm:ss 
    // 30 June 2013, 11:00:00'
    var countdown_timer = '1 Oct 2016, 19:00:00';

    // set any one of the following features to true/false
    var show_slider = false;
    var show_video = false;
    var show_fixedbg = false;

    // add/remove the background slider images here
    var slides_array = [
        { image: 'assets/slides/1.jpg' },
        { image: 'assets/slides/2.jpg' },
        { image: 'assets/slides/3.jpg' }
    ];

    // set the youtube video URL
    var youtube_video_url = 'http://www.youtube.com/watch?v=t2YNZtjQiXs';

    // show/hide the style switcher
    var show_styleswitcher = true;


    // do not change/remove the following code
    var fillStyleColor = window.getComputedStyle(document.getElementById('init-canvas'), null).backgroundColor;
    var strokeStyleColor = window.getComputedStyle(document.getElementById('init-canvas'), null).color;
}