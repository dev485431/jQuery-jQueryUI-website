(function ($) {
    "use strict";

    //initial setup and binding of elements
    $.fn.customPagination = function (itemTemplate, itemsArray, options) {
        var settings = $.extend({}, $.fn.customPagination.defaultSettings, options);

        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });

        CustomPagination.init(this, itemTemplate, itemsArray, settings);
        CustomPagination.renderPagination();
        CustomPagination.addNavigationListeners();
        return this;
    };


    var CustomPagination = function () {
        var element,
            itemTemplate,
            itemsArray,
            settings,
            currentPage = 1,

            init = function (_element, _itemTemplate, _itemsArray, _settings) {
                element = _element,
                    itemTemplate = _itemTemplate,
                    itemsArray = _itemsArray,
                    settings = _settings;
            },

            previousPage = function () {
                currentPage -= 1;
                renderPagination();
                console.log(currentPage);
            },

            nextPage = function () {
                currentPage += 1;
                renderPagination();
                console.log(currentPage);
            },

            renderPagination = function () {
                element.html(renderItems(getPageData()));
            },

            renderItems = function (pageData) {
                var html = '';
                for (var i = 0; i < pageData.length; i++) {
                    html += $.render.itemTemplate(pageData[i]);
                }
                html += renderNavigation();
                return html;
            },

            getPageData = function () {

                var itemsMaxIndex = itemsArray.length - 1,
                    lastItem = settings.itemsPerPage * currentPage - 1,
                    firstItem = settings.itemsPerPage * currentPage - settings.itemsPerPage,
                    pageData = [];

                if (lastItem <= itemsMaxIndex) {
                    for (var i = firstItem; i <= lastItem; i++) {
                        pageData.push(itemsArray[i]);
                    }
                } else {
                    for (var i = firstItem; i <= itemsMaxIndex; i++) {
                        pageData.push(itemsArray[i]);
                    }
                }
                return pageData;
            },

            renderNavigation = function () {
                // render html from it?
                var nav = '<div id="pagination">' +
                    '<div id="prev"><button>Prev</button></div>' +
                    '<div id="pagenum"><span>Page ' + currentPage + '</span></div>' +
                    '<div id="next"><button>Next</button></div></div>';
                return nav;
            },

            addNavigationListeners = function () {
                $(document).on('click', '#prev > button', function (event) {
                    // alert('back');
                    previousPage();
                });
                $(document).on('click', '#next > button', function (event) {
                    // alert('next');
                    nextPage();
                });
            };

        return {
            init: init,
            renderPagination: renderPagination,
            addNavigationListeners: addNavigationListeners
        };
    }();

    var timeConverter = function (UNIXtimestamp) {
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