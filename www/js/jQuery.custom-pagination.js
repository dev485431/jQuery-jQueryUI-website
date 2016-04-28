// Requires JsRender for rendering news template

(function ($) {
    "use strict";

    $.fn.customPagination = function (itemTemplate, itemsData, options) {
        var settings = $.extend({}, $.fn.customPagination.defaultSettings, options);

        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });

        CustomPagination.init(this, itemTemplate, itemsData, settings);
        CustomPagination.renderPagination();
        CustomPagination.addNavigationListeners();
        return this;
    };


    var CustomPagination = function () {
        var element,
            itemTemplate,
            itemsData,
            settings,
            currentPage = 1,
            minPage = 1,
            maxPage,

            init = function (_element, _itemTemplate, _itemsData, _settings) {
                element = _element,
                    itemTemplate = _itemTemplate,
                    itemsData = _itemsData,
                    settings = _settings,
                    maxPage = Math.ceil(itemsData.length / settings.itemsPerPage);

                console.log(maxPage);
            },

            previousPage = function () {
                if (previousPageExist()) {
                    currentPage--;
                    renderPagination();
                }
            },

            nextPage = function () {
                if (nextPageExist()) {
                    currentPage++;
                    renderPagination();
                }
            },

            previousPageExist = function () {
                return currentPage - 1 >= minPage ? true : false;
            },

            nextPageExist = function () {
                return currentPage + 1 <= maxPage ? true : false;
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

                var itemsMaxIndex = itemsData.length - 1,
                    lastItem = settings.itemsPerPage * currentPage - 1,
                    firstItem = settings.itemsPerPage * currentPage - settings.itemsPerPage,
                    pageData = [];

                if (lastItem <= itemsMaxIndex) {
                    for (var i = firstItem; i <= lastItem; i++) {
                        pageData.push(itemsData[i]);
                    }
                } else {
                    for (var i = firstItem; i <= itemsMaxIndex; i++) {
                        pageData.push(itemsData[i]);
                    }
                }
                return pageData;
            },

            renderNavigation = function () {
                // render html from it?
                var nav = '<div id="pagination">' +
                    '<div id="prev"><button' + (previousPageExist() ? '' : " disabled")
                    + '>Prev</button></div>' +
                    '<div id="pagenum"><span>Page ' + currentPage + '</span></div>' +
                    '<div id="next"><button' + (nextPageExist() ? '' : " disabled") + '>Next</button></div></div>';
                return nav;
            },

            addNavigationListeners = function () {
                $(document).on('click', '#prev > button', function (event) {
                    previousPage();
                });
                $(document).on('click', '#next > button', function (event) {
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