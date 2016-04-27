var NewsPagination = function () {
}

NewsPagination.prototype = function () {
    var newsDiv = $('#newsbox'),
        newsApiUrl = 'mocks/news-list.json.php',
        newsTemplate = 'templates/news-item.html',
        apiVariable = 'stories',
        timeout = 25000,

        init = function () {

            loadTemplateFromFile(newsTemplate)
                .done(function (templateData) {
                    getApiContent()
                        .done(function (apiData) {
                            newsDiv.customPagination(templateData, apiData[apiVariable], {
                                itemsPerPage: 7
                            });
                        });
                });
        },

        getApiContent = function () {
            return $.ajax({
                url: newsApiUrl,
                dataType: 'json',
                timeout: timeout
            });
        },

        loadTemplateFromFile = function (path) {
            return $.ajax({
                url: path,
                async: false,
                dataType: 'text',
                cache: false
            });
        };

    return {
        init: init
    };


}();