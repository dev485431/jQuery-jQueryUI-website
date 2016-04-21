$(function () {
    var accordionDiv = $('#navaccordion'),
        loaderDiv = $('#menu-loader'),
        menuApiUrl = 'mocks/navigation.json.php',
        accCacheName = 'accordionCache',
        accHeightStyle = 'content',
        defaultTabIndex = 1,
        ajaxTimeoutMs = 10000;

    loaderDiv.show();
    getApiData()
        .done(function (data) {
            accordionDiv.append(parseHtml(data));
            accordionDiv.accordion({
                active: getAccordionState(),
                heightStyle: accHeightStyle,
                activate: function () {
                    setAccordionState(accordionDiv.accordion("option", "active"));
                }
            });
        })
        .always(function () {
            loaderDiv.hide();
        });


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

    function getAccordionState() {
        return $.sessionStorage.isSet(accCacheName) ? $.sessionStorage.get(accCacheName) : defaultTabIndex;
    }

    function setAccordionState(tabId) {
        $.sessionStorage.set(accCacheName, tabId);
    }
});