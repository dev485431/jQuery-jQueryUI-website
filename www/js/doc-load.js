// initialization of element of the website
$(function () {
    var accordionMenu = new AccordionMenu();
    accordionMenu.init();

    var loginBox = new LoginBox();
    loginBox.init();

    var quoteService = new QuoteService();
    quoteService.init();

    $('#search_term').one('focus', function () {
        var searchAutoComplete = new SearchAutoComplete();
        searchAutoComplete.init();
    });
});

