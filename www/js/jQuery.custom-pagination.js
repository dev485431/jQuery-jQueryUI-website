(function ($) {

    var defaultItemsPerPage = 7;

    $.fn.customPagination = function (itemTemplate, itemsArray, options) {
        var settings = $.extend({}, $.fn.customPagination.defaults, options);
        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });
        // page number here should be dynamic
        return this.html(renderNewsHtml(getPageContent(itemsArray, 1)));
    };


    var renderNewsHtml = function (pageData) {
            var html = '';
            for (var i = 0; i < pageData.length; i++) {
                html += $.render.itemTemplate(pageData[i]);
            }
            return html;
        },

        getPageContent = function (itemsArray, pageNumber) {

            var itemsIndex = itemsArray.length - 1,
                lastItem = defaultItemsPerPage * pageNumber - 1,
                firstItem = defaultItemsPerPage * pageNumber - defaultItemsPerPage,
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
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        };

    $.fn.customPagination.defaults = {
        itemsPerPage: defaultItemsPerPage
    };

}(jQuery));