$("#search_term").on("focus", function () {
    // probably move all cached dom elements to the 1st script file
    var searchTerm = $("#search_term"),
        searchForm = $("#search_form"),
        searchButton = $("#search_button"),

        autoCompleteUrl = 'mocks/search.json.php',
        apiVariable = 'titles',
        acCacheName = 'autocompleteCache',
        ajaxTimeout = 10000,
        errInputMessage = 'Please try again later';


    searchTerm.autocomplete({

        source: function (request, response) {
            var term = request.term.toLowerCase(),
                element = this.element,
                cache = this.element.data(acCacheName) || [];

            if (cache.length === 0) {
                getAutoCompleteData(request)
                    .done(function (data) {
                        cache = data[apiVariable];
                        element.data(acCacheName, cache);
                        console.log("Doing ajax call for cache");
                        response(searchCache(cache, term));
                    })
                    .error(function () {
                        searchTerm.prop('disabled', true).val(errInputMessage).addClass('ui-state-disabled');
                        searchButton.prop('disabled', true);
                    });
            } else {
                response(searchCache(cache, term));
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

    function searchCache(cache, term) {
        var results = [];
        $.each(cache, function (i, val) {
            console.log("Cache search loop");
            if (val.toLowerCase().indexOf(term) !== -1) {
                results.push(val);
            }
        });
        return results;
    }

    function getAutoCompleteData(request) {
        return $.ajax({
            url: autoCompleteUrl,
            dataType: "json",
            data: request,
            timeout: ajaxTimeout
        });
    }
});



