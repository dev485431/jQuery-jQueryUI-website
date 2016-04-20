$("#search_term").on("focus", function () {

    var searchTerm = $("#search_term"),
        searchForm = $("#search_form"),

        apiUrl = "mocks/search.json.php",
        apiVariable = "titles",
        ajaxTimeout = 10000,
        acCacheName = "autoCompleteCache",
        classUIAutoComplete = "ui-autocomplete",
        classUIAutoCompleteItem = "ui-autocomplete-item";


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
                        response(searchCache(cache, term));
                    });
            } else {
                response(searchCache(cache, term));
            }
        },

        select: function (event, ui) {
            searchTerm.val(ui.item.label);
            searchForm.submit();
        }

    }).data(classUIAutoComplete)._renderItem = function (ul, item) {
        return $("<li>")
            .data(classUIAutoCompleteItem, item)
            .append("<a>" + item.label + "</a>")
            .appendTo(ul);
    };

    function searchCache(cache, term) {
        var results = [];
        $.each(cache, function (i, val) {
            if (val.toLowerCase().indexOf(term) !== -1) {
                results.push(val);
            }
        });
        return results;
    }

    function getAutoCompleteData(request) {
        return $.ajax({
            url: apiUrl,
            dataType: "json",
            data: request,
            timeout: ajaxTimeout
        });
    }
});



