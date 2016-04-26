// initialization of element of the website
$(function () {
    var accordionMenu = new AccordionMenu();
    accordionMenu.init();

    var loginBox = new LoginBox();
    loginBox.init();

    //Event-based init
    $('#search_term').one('focus', function () {
        var searchAutoComplete = new SearchAutoComplete();
        searchAutoComplete.init();
    });
});

