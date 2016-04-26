var QuoteService = function () {
}

QuoteService.prototype = function () {

    var quoteSpan = $('#lovelyquote'),
        quotesUrl = 'http://quote-service.local/api.php',
        callbackParam = 'callback',
        timeout = 25000,

        init = function () {
            getJson()
                .done(function (data) {
                    insertQuote(quoteSpan, data.text + ' - ' + data.author);
                });
        },

        getJson = function () {
            return $.ajax({
                url: quotesUrl,
                jsonp: callbackParam,
                dataType: "jsonp"
            });
        },

        insertQuote = function (selector, quote) {
            selector.html(quote);
        };

    return {
        init: init
    };

}();