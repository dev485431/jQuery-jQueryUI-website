var QuoteService = function () {
}

QuoteService.prototype = function () {

    var quoteSpan = $('#lovelyquote'),
        quoteLoader = $('#quote-loader'),
        quotesUrl = 'http://quote-service.local/api.phps',
        defaultQuote = 'There may be no "I" in team, but there\'s a "ME" if you look hard enough. - David Brent',
        callbackParam = 'callback',
        timeout = 5000,

        init = function () {
            quoteLoader.show();
            getJson()
                .done(function (data) {
                    insertQuote(quoteSpan, data.text + ' - ' + data.author);
                })
                .fail(function () {
                    quoteSpan.text(defaultQuote);
                })
                .always(function () {
                    quoteLoader.hide();
                });
        },

        getJson = function () {
            return $.ajax({
                url: quotesUrl,
                jsonp: callbackParam,
                dataType: "jsonp",
                timeout: timeout
            });
        },

        insertQuote = function (selector, quote) {
            selector.html(quote);
        };

    return {
        init: init
    };

}();