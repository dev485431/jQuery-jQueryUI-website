// initialization of element of the website
$(function () {
    var accordionMenu = new AccordionMenu();
    accordionMenu.init();

    $('#search_term').one('focus', function () {
        var searchAutoComplete = new SearchAutoComplete();
        searchAutoComplete.init();
    });
});

