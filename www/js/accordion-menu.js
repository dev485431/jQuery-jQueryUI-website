var AccordionMenu = function () {
}

AccordionMenu.prototype = function () {

    var accordionDiv = $('#navaccordion'),
        loaderDiv = $('#menu-loader'),
        menuApiUrl = 'mocks/navigation.json.php',
        accActiveTab = 'accordionTab',
        accCacheName = 'accordionCache',
        accHeightStyle = 'content',
        defaultTabIndex = 1,
        ajaxTimeoutMs = 10000,
        templateFile = 'templates/nav.html',

        init = function () {
            loaderDiv.show();
            loadTemplateFromFile(templateFile)
                .done(function (templateData) {
                    $.templates({'accordionTemplate': templateData});

                    if ($.sessionStorage.isEmpty(accCacheName)) {
                        getApiData()
                            .done(function (apiData) {
                                $.sessionStorage.set(accCacheName, apiData);
                                accordionDiv.html(
                                    $.render.accordionTemplate(apiData)
                                );
                                activateAccordion();
                            })
                            .always(function () {
                                loaderDiv.hide();
                            });
                    } else {
                        accordionDiv.html(
                            $.render.accordionTemplate($.sessionStorage.get(accCacheName))
                        );
                        activateAccordion();
                        loaderDiv.hide();
                    }
                }).fail(function () {
                loaderDiv.hide();
            });
        },

        getApiData = function () {
            return $.ajax({
                url: menuApiUrl,
                dataType: 'json',
                timeout: ajaxTimeoutMs
            });
        },

        loadTemplateFromFile = function (path) {
            return $.ajax({
                url: path,
                async: false,
                dataType: 'text'
            });
        },

        activateAccordion = function () {
            accordionDiv.accordion({
                active: getActiveTab(),
                heightStyle: accHeightStyle,
                activate: function () {
                    setActiveTab(accordionDiv.accordion("option", "active"));
                }
            });
        },

        getActiveTab = function () {
            return $.sessionStorage.isSet(accActiveTab) ? $.sessionStorage.get(accActiveTab) : defaultTabIndex;
        },

        setActiveTab = function (tabId) {
            $.sessionStorage.set(accActiveTab, tabId);
        };

    return {
        init: init
    };

}();
