(function ($) {
    "use strict";

    var loadSkin = function (href) {
        var cssLink = $("<link>");
        $("head").append(cssLink); //IE hack: append before setting href

        cssLink.attr({
            rel: "stylesheet",
            type: "text/css",
            href: href
        });
    };

    var resetAll = function() {
        $.removeCookie("option");
        $.removeCookie("skin");
        $.cookie("option", "fixedbg", { expires: 1 });
        $.cookie("skin", "skin1", { expires: 1 });
        location.reload();
    }

    $(document).ready(function () {
        if (show_styleswitcher) {
            var render_styleswitcher = '<div id="style-switcher" class="push">\
    <div class="switcher-container">\
        <div class="rows">\
            <div class="btn-group-vertical styles" data-toggle="buttons">\
                <label class="btn btn-default" id="opt-slider">\
                    <input type="radio" name="options" />\
                    <span class="fa fa-desktop"></span>Slider\
                </label>\
                <label class="btn btn-default" id="opt-video">\
                    <input type="radio" name="options" />\
                    <span class="fa fa-video-camera"></span>Video\
                </label>\
                <label class="btn btn-default" id="opt-fixedbg">\
                    <input type="radio" name="options" />\
                    <span class="fa fa-picture-o"></span>Fixed Background\
                </label>\
            </div>\
        </div>\
        <div class="rows skins">\
            <button class="btn" id="btn-skin1"></button>\
            <button class="btn" id="btn-skin2"></button>\
            <button class="btn" id="btn-skin3"></button>\
            <button class="btn" id="btn-skin4"></button>\
            <button class="btn" id="btn-skin5"></button>\
        </div>\
        <div class="rows">\
            <button id="btn-reset" class="btn btn-danger">reset</button>\
        </div>\
        <div class="clearfix"></div>\
        <a class="puller" href="#_"><i class="fa fa-cog"></i></a>\
    </div>\
    <div class="clearfix"></div>\
</div>';

            $('body').append(render_styleswitcher);

            $("#style-switcher .puller").click(function () {
                if ($("#style-switcher").hasClass("push")) {
                    $("#style-switcher").removeClass("push").addClass("pull");
                }
                else {
                    $("#style-switcher").removeClass("pull").addClass("push");
                }
            });
            $('#style-switcher input[name="options"]').parent().click(function () {
                var option = $(this).attr('id').split('-')[1];
                if (option == 'fixedbg') {
                    location.href = 'index.html';
                }
                else if (option == 'slider') {
                    location.href = 'index-2.html';
                }
                else if (option == 'video') {
                    location.href = 'index-3.html';
                }
            });


            $('#style-switcher #btn-reset').click(function () {
                resetAll();
            });

            var skin = $.cookie("skin");
            if (skin == null) {
                $.cookie("skin", "skin1", { expires: 1 });
                skin = $.cookie("skin");
            }
            $('#style-switcher .skins .btn').click(function () {
                var skin = $(this).attr('id').split('-')[1];
                $.cookie("skin", skin, { expires: 1 });
                location.reload();
            });

            var skin_path = 'assets/less/' + skin + '.css';
            loadSkin(skin_path);

            $.get(skin_path, function (response) {
                strokeStyleColor = window.getComputedStyle(document.getElementById('init-canvas'), null).color;
                window.loadCanvasTimer(fillStyleColor, strokeStyleColor);
            });

            $('#style-switcher input[name="options"]').parent().removeClass('active');
            $('#style-switcher .skins .btn').removeClass('active');
            var option = 'fixedbg';
            if (location.href.indexOf('index.html') > 0) {
                option = 'fixedbg';
            }
            else if (location.href.indexOf('index-2.html') > 0) {
                option = 'slider';
            }
            else if (location.href.indexOf('index-3.html') > 0) {
                option = 'video';
            }
            $('#opt-' + option).addClass('active');
            $('#btn-' + skin).addClass('active');
        }
    });
})(jQuery);