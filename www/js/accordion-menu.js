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
        template = $.templates('#tempNav'),

        init = function () {
            loaderDiv.show();
            if ($.sessionStorage.isEmpty(accCacheName)) {
                getApiData()
                    .done(function (data) {
                        $.sessionStorage.set(accCacheName, data);
                        accordionDiv.append(template.render({
                            menuItems: data
                        }));
                        activateAccordion();
                    })
                    .always(function () {
                        loaderDiv.hide();
                    });
            } else {
                accordionDiv.append(template.render({
                    menuItems: $.sessionStorage.get(accCacheName)
                }));
                activateAccordion();
                loaderDiv.hide();
            }
        },

        getApiData = function () {
            return $.ajax({
                url: menuApiUrl,
                dataType: 'json',
                timeout: ajaxTimeoutMs
            });
        },

        parseHtml = function (data) {
            var html = '';
            $.each(data, function () {
                html += ('<h3>' + this.title + '</h3><div>');

                var subItems = this.subitems;
                $.each(subItems, function () {
                    html += '<p><a href="' + this.url + '">' + this.title + '</a></br>';
                    html += this.description ? this.description + '</p>' : '</p>';
                });
                html += '</div>';
            });
            return html;
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
