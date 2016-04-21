// #navaccordion

$(function () {
    var accordionDiv = $('#navaccordion'),
        menuApiUrl = 'mocks/navigation.json.php',
        accCacheName = 'accordionCache',
        accHeightStyle = 'content',
        defaultTabIndex = 1;

    // loader start

    $.getJSON(menuApiUrl, function (data) {
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

        accordionDiv.append(html);
        accordionDiv.accordion({
            active: getAccordionState(),
            heightStyle: accHeightStyle,
            activate: function () {
                setAccordionState(accordionDiv.accordion("option", "active"));
            }
        });

        // loader stop

    });

    function getAccordionState() {
        return $.sessionStorage.isSet(accCacheName) ? $.sessionStorage.get(accCacheName) : defaultTabIndex;
    }

    function setAccordionState(tabId) {
        $.sessionStorage.set(accCacheName, tabId);
    }
});