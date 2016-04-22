$(function () {
    var accordionDiv = $('#navaccordion'),
        loaderDiv = $('#menu-loader'),
        menuApiUrl = 'mocks/navigation.json.php',
        accActiveTab = 'accordionTab',
        accCacheName = 'accordionCache',
        accHeightStyle = 'content',
        defaultTabIndex = 1,
        ajaxTimeoutMs = 10000;

    loaderDiv.show();
    // if sessionStorage or else ajax


    if ($.sessionStorage.isEmpty(accCacheName)) {
        getApiData()
            .done(function (data) {
                $.sessionStorage.set(accCacheName, data);
                accordionDiv.append(parseHtml(data));
                activateAccordion();
            })
            .always(function () {
                loaderDiv.hide();
            });
    } else {
        accordionDiv.append(parseHtml($.sessionStorage.get(accCacheName)));
        activateAccordion();
        loaderDiv.hide();
    }


    function getApiData() {
        return $.ajax({
            url: menuApiUrl,
            dataType: 'json',
            timeout: ajaxTimeoutMs
        });
    }

    function parseHtml(data) {
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
    }

    function activateAccordion() {
        accordionDiv.accordion({
            active: getActiveTab(),
            heightStyle: accHeightStyle,
            activate: function () {
                setActiveTab(accordionDiv.accordion("option", "active"));
            }
        });
    }

    function getActiveTab() {
        return $.sessionStorage.isSet(accActiveTab) ? $.sessionStorage.get(accActiveTab) : defaultTabIndex;
    }

    function setActiveTab(tabId) {
        $.sessionStorage.set(accActiveTab, tabId);
    }
});