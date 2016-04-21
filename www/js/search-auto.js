$('#search_term').one('focus', function () {

    var searchTerm = $('#search_term'),
        searchForm = $('#search_form'),

        apiUrl = 'mocks/search.json.php',
        apiVariable = 'titles',
        ajaxTimeoutMs = 10000,
        acCacheName = 'autoCompleteCache',
        classUIAutoComplete = 'ui-autocomplete',
        classUIAutoCompleteItem = 'ui-autocomplete-item',
        classUIAutoCompleteLoad = 'ui-autocomplete-loading',
        noResultsId = '#no-result',
        noResultsMsg = 'No results found';

    searchTerm.autocomplete({

        source: function (request, response) {
            var term = request.term.toLowerCase();

            if ($.sessionStorage.isEmpty(acCacheName)) {
                getAutoCompleteData(request)
                    .done(function (data) {
                        var apiData = data[apiVariable];
                        $.sessionStorage.set(acCacheName, apiData);
                        response(searchCache(apiData, term));
                    }).fail(function () {
                    searchTerm.removeClass(classUIAutoCompleteLoad);
                });
            } else {
                response(searchCache($.sessionStorage.get(acCacheName), term));
            }
        },

        select: function (event, ui) {
            searchTerm.val(ui.item.label);
            searchForm.submit();
        },

        response: function (event, ui) {
            var noResults = $(noResultsId);
            if (ui.content.length === 0) {
                noResults.text(noResultsMsg);
            } else {
                noResults.empty();
            }
        }

    }).data(classUIAutoComplete)._renderItem = function (ul, item) {
        return $('<li>')
            .data(classUIAutoCompleteItem, item)
            .append('<a>' + item.label + '</a>')
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
            dataType: 'json',
            data: request,
            timeout: ajaxTimeoutMs
        });
    }
});



