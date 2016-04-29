// Requires JsRender for rendering news template

(function ($) {

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
            fadeInMs = 900,

            init = function (_element, _itemTemplate, _itemsData, _settings) {
                element = _element,
                    itemTemplate = _itemTemplate,
                    itemsData = _itemsData,
                    settings = _settings,
                    currentPage = readPageNo()
                maxPage = Math.ceil(itemsData.length / settings.itemsPerPage);
            },

            addNavigationListeners = function () {
                $(document).on('click', '#prev > button', function (event) {
                    previousPage();
                });
                $(document).on('click', '#next > button', function (event) {
                    nextPage();
                });
                $(window).on('hashchange', function () {
                    // if (readPageNo() != currentPage) {
                    currentPage = readPageNo();
                    renderPagination();
                    // }
                });
            },

            appendPageNo = function (pageNo) {
                window.location.hash = pageNo;
            },

            readPageNo = function () {
                var savedPageNo = parseInt(window.location.hash.substring(1));
                return savedPageNo ? savedPageNo : currentPage;
            },

            renderPagination = function () {
                element.hide().html(renderItems(getPageData())).fadeIn(fadeInMs);
            },

            previousPage = function () {
                if (previousPageExists()) {
                    currentPage--;
                    appendPageNo(currentPage);
                }
            },

            nextPage = function () {
                if (nextPageExists()) {
                    currentPage++;
                    appendPageNo(currentPage);
                }
            },

            previousPageExists = function () {
                return currentPage - 1 >= minPage ? true : false;
            },

            nextPageExists = function () {
                return currentPage + 1 <= maxPage ? true : false;
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

                var nav = '<div id="pagination">' +
                    '<div id="prev"><button' + prevDisable + '>Prev</button></div>' +
                    '<div id="pagenum"><span>Page ' + currentPage + '</span></div>' +
                    '<div id="next"><button' + nextDisable + '>Next</button></div></div>';
                return nav;
            };

        return {
            init: init,
            renderPagination: renderPagination,
            addNavigationListeners: addNavigationListeners
        };
    }();

    var timeConverter = function (unixTimestamp) {
        var a = new Date(unixTimestamp * 1000);
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