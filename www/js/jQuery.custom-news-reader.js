(function ($) {

    $.fn.newsreader = function (options) {

        var settings = $.extend({
            newsPerPage: 7
        }, options);

        // return object with options
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });


    };

}(jQuery));