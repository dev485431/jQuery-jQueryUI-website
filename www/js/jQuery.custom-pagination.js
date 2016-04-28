(function ($) {

    //initial setup and binding of elements
    $.fn.customPagination = function (itemTemplate, itemsArray, options) {
        var settings = $.extend({}, $.fn.customPagination.defaultSettings, options);

        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });

        var customPagination = new CustomPagination(this, itemTemplate, itemsArray, settings);
        customPagination.renderPagination();
        return this;
    };


    var CustomPagination = function (element, itemTemplate, itemsArray, settings) {
            this.element = element;
            this.itemTemplate = itemTemplate;
            this.itemsArray = itemsArray;
            this.settings = settings;
            this.currentPage = 1;


            this.previousPage = function () {
                this.currentPage--;
                this.renderPagination();
            };

            this.nextPage = function () {
                this.currentPage++;
                this.renderPagination();
            };

            this.renderPagination = function () {
                this.element.html(this.renderNews(this.getPageData()));
            };

            this.renderNews = function (pageData) {
                var html = '';
                for (var i = 0; i < pageData.length; i++) {
                    html += $.render.itemTemplate(pageData[i]);
                }
                html += this.renderNavigation();
                return html;
            };

            this.getPageData = function () {

                var itemsMaxIndex = this.itemsArray.length - 1,
                    lastItem = this.settings.itemsPerPage * this.currentPage - 1,
                    firstItem = this.settings.itemsPerPage * this.currentPage - this.settings.itemsPerPage,
                    pageData = [];

                if (lastItem <= itemsMaxIndex) {
                    for (var i = firstItem; i <= lastItem; i++) {
                        pageData.push(this.itemsArray[i]);
                    }
                } else {
                    for (var i = firstItem; i <= itemsMaxIndex; i++) {
                        pageData.push(this.itemsArray[i]);
                    }
                }
                return pageData;
            };

            this.renderNavigation = function () {
                // render html from it?
                var nav = '<div id="pagination">' +
                    '<div id="prev"><button>Prev</button></div>' +
                    '<div id="pagenum"><span>Page ' + this.currentPage + '</span></div>' +
                    '<div id="next"><button>Next</button></div></div>';
                return nav;
            };

        },

        timeConverter = function (UNIXtimestamp) {
            var a = new Date(UNIXtimestamp * 1000);
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