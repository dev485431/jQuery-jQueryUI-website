$(function () {
    var searchTerm = $("#search_term"),
        searchForm = $("#search_form"),

        autoCompleteUrl = 'mocks/search.json.php',
        apiVariable = 'titles',
        ajaxTimeout = 10000,
        errInputCallback = 'Please try again later';


    searchTerm.autocomplete({

        source: function (request, response) {
            var term = request.term.toLowerCase(),
                element = this.element,
                cache = this.element.data('autocompleteCache') || [];

            if (cache.length === 0) {
                $.ajax({
                    url: autoCompleteUrl,
                    dataType: "json",
                    data: request,
                    timeout: ajaxTimeout,
                    success: function (data) {
                        cache = data[apiVariable];
                        element.data('autocompleteCache', cache);
                        console.log("Doing ajax call for cache");
                        response(search(cache, term));
                    },
                    error: function () {
                        searchTerm.attr('disabled', 'disabled').val(errInputCallback).addClass('ui-state-disabled');
                    }
                });
            } else {
                response(search(cache, term));
            }
        },

        select: function (event, ui) {
            searchTerm.val(ui.item.label);
            searchForm.submit();
        }

    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
            .data("ui-autocomplete-item", item)
            .append("<a>" + item.label + "</a>")
            .appendTo(ul);
    };
});

function search(cache, term) {
    var results = [];
    $.each(cache, function (i, val) {
        console.log("Cache search loop");
        if (val.toLowerCase().indexOf(term) !== -1) {
            results.push(val);
        }
    });
    return results;
}