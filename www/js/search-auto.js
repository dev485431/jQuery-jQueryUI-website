'use strict';

var SearchAutoComplete = function () {
};

SearchAutoComplete.prototype = function () {

    var searchTerm = $('#search_term'),
        searchForm = $('#search_form'),

        apiUrl = 'mocks/search.json.php',
        apiVariable = 'titles',
        ajaxTimeoutMs = 25000,
        acCacheName = 'autoCompleteCache',
        cssUIAutoComplete = 'ui-autocomplete',
        cssUIAutoCompleteItem = 'ui-autocomplete-item',
        cssUIAutoCompleteLoad = 'ui-autocomplete-loading',
        noResultsId = '#no-search-result',
        noResultsMsg = 'No results found',

        init = function () {
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
                            searchTerm.removeClass(cssUIAutoCompleteLoad);
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

            }).data(cssUIAutoComplete)._renderItem = function (ul, item) {
                return $('<li>')
                    .data(cssUIAutoCompleteItem, item)
                    .append('<a>' + item.label + '</a>')
                    .appendTo(ul);
            };
        },

        searchCache = function (cache, term) {
            var results = [];
            $.each(cache, function (i, val) {
                if (val.toLowerCase().indexOf(term) !== -1) {
                    results.push(val);
                }
            });
            return results;
        },

        getAutoCompleteData = function (request) {
            return $.ajax({
                url: apiUrl,
                dataType: 'json',
                data: request,
                timeout: ajaxTimeoutMs
            });
        };

    return {
        init: init
    };

}();



