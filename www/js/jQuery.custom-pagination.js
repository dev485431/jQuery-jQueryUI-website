// Requires JsRender for rendering news template

(function ($) {

    $.fn.customPagination = function (itemTemplate, itemsData, options) {
        $.templates({'itemTemplate': itemTemplate});
        $.views.converters("newsdate", function (val) {
            return timeConverter(val);
        });

        var settings = $.extend({}, $.fn.customPagination.defaultSettings, options);
        CustomPagination.init(this, itemTemplate, itemsData, settings);
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
            fadeInMs = 900,

            init = function (_element, _itemTemplate, _itemsData, _settings) {
                element = _element;
                itemTemplate = _itemTemplate;
                itemsData = _itemsData;
                settings = _settings;
                maxPage = Math.ceil(itemsData.length / settings.itemsPerPage);
                currentPage = validatePageNum(getCurrentPageNum());
                renderPagination();
                addNavigationListeners();
            },

            renderPagination = function () {
                element.hide().html(renderItems(getPageData())).fadeIn(fadeInMs);
            },

            addNavigationListeners = function () {
                $(document).on('click', '#pagination-prev > button', function () {
                    previousPage();
                });
                $(document).on('click', '#pagination-next > button', function () {
                    nextPage();
                });
                $(window).on('hashchange', function () {
                    currentPage = validatePageNum(getCurrentPageNum());
                    renderPagination();
                });
            },

            getCurrentPageNum = function () {
                return window.location.hash.substring(1);
            },

            validatePageNum = function (pageNum) {
                var tempPageNum = parseInt(pageNum);
                return tempPageNum && isPageNumInScope(tempPageNum) ? tempPageNum : minPage;
            },

            appendPageNum = function (pageNum) {
                window.location.hash = pageNum;
            },

            previousPage = function () {
                if (previousPageExists()) {
                    currentPage--;
                    appendPageNum(currentPage);
                }
            },

            nextPage = function () {
                if (nextPageExists()) {
                    currentPage++;
                    appendPageNum(currentPage);
                }
            },

            previousPageExists = function () {
                return currentPage - 1 >= minPage ? true : false;
            },

            nextPageExists = function () {
                return currentPage + 1 <= maxPage ? true : false;
            },

            isPageNumInScope = function (pageNum) {
                return pageNum >= minPage && pageNum <= maxPage;
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
                var prevDisable = previousPageExists() ? '' : " disabled",
                    nextDisable = nextPageExists() ? '' : " disabled";

                var nav = '<div id="custom-pagination">' +
                    '<div id="pagination-prev"><button' + prevDisable + '>Prev</button></div>' +
                    '<div id="pagination-pagenum"><span>Page ' + currentPage + '</span></div>' +
                    '<div id="pagination-next"><button' + nextDisable + '>Next</button></div></div>';
                return nav;
            };

        return {
            init: init
        };
    }();

    var timeConverter = function (unixTimestamp) {
        var d = new Date(unixTimestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year = d.getFullYear(),
            month = months[d.getMonth()],
            day = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds(),
            time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    };

    $.fn.customPagination.defaultSettings = {
        itemsPerPage: 7
    };

}(jQuery));