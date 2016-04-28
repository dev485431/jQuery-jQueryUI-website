var QuoteService = function () {
}

QuoteService.prototype = function () {

    var quoteSpan = $('#lovelyquote'),
        quoteLoader = $('#quote-loader'),
        quotesUrl = 'http://quote-service.local/api.php',
        callbackParam = 'callback',
        timeout = 25000,

        init = function () {
            quoteLoader.show();
            getJson()
                .done(function (data) {
                    insertQuote(quoteSpan, data.text + ' - ' + data.author);
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