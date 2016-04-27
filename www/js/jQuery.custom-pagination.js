(function ($) {

    var settings,
        currentPage = 1;

    //initial setup and binding of elements
    $.fn.customPagination = function (itemTemplate, itemsArray, options) {
        settings = $.extend({}, $.fn.customPagination.defaultSettings, options);

        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });
        // save, read, set current page
        return renderPagination(this, itemsArray, currentPage);
    };

    var renderPagination = function (element, itemsArray, currentPage) {
            element.html(renderNewsHtml(getPageData(itemsArray, currentPage)));
        },

        renderNewsHtml = function (pageData) {
            var html = '';
            for (var i = 0; i < pageData.length; i++) {
                html += $.render.itemTemplate(pageData[i]);
            }
            // here also append nav

            return html;

        },

        renderNavigation = function (currentPage) {
            // action listeners "on"
            // get current page and generate back,forward accordingly
        },

        getPageData = function (itemsArray, pageNumber) {

            var itemsIndex = itemsArray.length - 1,
                lastItem = settings.itemsPerPage * pageNumber - 1,
                firstItem = settings.itemsPerPage * pageNumber - settings.itemsPerPage,
                newsDataPerPage = [];

            if (lastItem <= itemsIndex) {
                for (var i = firstItem; i <= lastItem; i++) {
                    newsDataPerPage.push(itemsArray[i]);
                }
            } else {
                for (var i = firstItem; i <= itemsIndex; i++) {
                    newsDataPerPage.push(itemsArray[i]);
                }
            }
            return newsDataPerPage;
        },

        nextPage = function () {

        },

        previousPage = function () {

        },

        timeConverter = function (UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var day = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        };

    $.fn.customPagination.defaultSettings = {
        itemsPerPage: 7
    };

}(jQuery));