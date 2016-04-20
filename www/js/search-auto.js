$("#search_term").one("focus", function () {

    var searchTerm = $("#search_term"),
        searchForm = $("#search_form"),

        apiUrl = "mocks/search.json.php",
        apiVariable = "titles",
        ajaxTimeoutMs = 10000,
        acCookieName = "autoCompleteCookie",
        acCookieExpireMin = 1,
        acCookieExpireMultiplier = 60000,
        classUIAutoComplete = "ui-autocomplete",
        classUIAutoCompleteItem = "ui-autocomplete-item",
        classUIAutoCompleteLoad = "ui-autocomplete-loading";

    // Cookies.remove(acCookieName);

    searchTerm.autocomplete({

        source: function (request, response) {
            var term = request.term.toLowerCase(),
                acCookieValue = Cookies.get(acCookieName);

            if (acCookieValue) {
                // console.log("Cookie exists");
                response(searchCache($.parseJSON(acCookieValue), term));
            } else {
                getAutoCompleteData(request)
                    .done(function (data) {
                        // console.log("Downloading cookie content");
                        var apiData = data[apiVariable],
                            acCookieExpiration = new Date(Date.now() + acCookieExpireMin * acCookieExpireMultiplier);
                        // console.log("Current date: " + Date.now() + " Expires: " + acCookieExpiration);
                        Cookies.set(acCookieName, apiData, acCookieExpiration);
                        response(searchCache(apiData, term));
                    }).fail(function () {
                    searchTerm.removeClass(classUIAutoCompleteLoad);
                });
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
            timeout: ajaxTimeoutMs
        });
    }
});



