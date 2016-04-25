var LoginBox = function () {
}

LoginBox.prototype = function () {

    var loginDiv = $('#login-box'),
        templateFile = 'templates/login/login-register-overlay.html',
        boxPosition = {my: "center top+80", at: "center top", of: window},


        init = function () {

            loadTemplateFromFile(templateFile)
                .done(function (templateData) {
                    loginDiv.html(templateData);
                    loginDiv.dialog({
                        position: boxPosition
                    });

                    // sprobowac:
                    // $('#login-form').validate({
                    //  submitHandler: function() { alert("Submitted!") }
                    // }});

                    $(document).on('focus submit', '#login-form', function (event) {
                        event.preventDefault();
                        var loginForm = $(this);
                        loginForm.validate({
                            rules: {
                                flogin: {
                                    required: true,
                                    minlength: 3,
                                    email: true
                                },
                                fpass: {
                                    required: true,
                                    minlength: 5
                                }
                            },
                            errorElement: 'div'
                        });
                    });

                    $(document).on('focus submit', '#register-form', function (event) {
                        event.preventDefault();
                        var registerForm = $(this);
                        registerForm.validate({
                            rules: {
                                femail: {
                                    required: true,
                                    minlength: 3,
                                    email: true
                                },
                                floginnew: {
                                    required: true,
                                    minlength: 5
                                }
                            },
                            errorElement: 'div'
                        });

                    });
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