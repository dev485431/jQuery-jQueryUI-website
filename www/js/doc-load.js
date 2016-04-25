// initialization of element of the website
$(function () {
    var accordionMenu = new AccordionMenu();
    accordionMenu.init();

    //Event-based init
    $('#search_term').one('focus', function () {
        var searchAutoComplete = new SearchAutoComplete();
        searchAutoComplete.init();
    });

    $('#login-link').click(function () {
        var loginBox = new LoginBox();
        loginBox.init();
    });
});

