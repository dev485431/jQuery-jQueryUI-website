var LoginBox = function () {
}

LoginBox.prototype = function () {

    var loginLink = $('#login-link'),
        loginDiv = $('#hlogin'),
        dialogDiv = $('#login-box'),
        loggedInFlag = 'loggedInFlag',
        loggedInEmail = 'loggedInEmail',
        templateOverlay = 'templates/login/login-register-overlay.html',
        templateInlay = 'templates/login/greet-register-inlay.html',
        dialogPosition = {my: "center-50 top+80", at: "center top", of: window},
        textLoggedIn = 'You are logged in as ',
        textRegistered = 'Thanks for the registration. You are logged in as ',


        init = function () {
            if (isLoggedIn()) {
                renderLoginText(loginDiv, textLoggedIn + $.sessionStorage.get(loggedInEmail));
            } else {
                loginLink.click(function () {
                    initDialogBox();
                });
            }
        },

        initDialogBox = function () {

            loadTemplateFromFile(templateOverlay)
                .done(function (templateData) {
                    dialogDiv.html(templateData);
                    dialogDiv.dialog({
                        position: dialogPosition
                    });

                    $(document).on('focus submit', '#login-form', function (event) {
                        $(this).validate({
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
                            errorElement: 'div',
                            submitHandler: function (form) {
                                logIn(form.elements['flogin'].value);
                                dialogDiv.dialog('close');
                                return false;
                            }
                        });
                    });

                    $(document).on('focus submit', '#register-form', function (event) {
                        $(this).validate({
                            rules: {
                                femail: {
                                    required: true,
                                    minlength: 3,
                                    email: true
                                },
                                fpassnew: {
                                    required: true,
                                    minlength: 5
                                },
                                fpassnewconf: {
                                    required: true,
                                    minlength: 5,
                                    equalTo: "#fpassnew"
                                }
                            },
                            errorElement: 'div',
                            submitHandler: function (form) {
                                register(form.elements['femail'].value);
                                dialogDiv.dialog('close');
                                return false;
                            }
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
        },

        logIn = function (email) {
            $.sessionStorage.set(loggedInFlag, true);
            $.sessionStorage.set(loggedInEmail, email);
            renderLoginText(loginDiv, textLoggedIn + email);
        },

        register = function (email) {
            $.sessionStorage.set(loggedInFlag, true);
            $.sessionStorage.set(loggedInEmail, email);
            renderLoginText(loginDiv, textRegistered + email);
        },

        isLoggedIn = function () {
            return $.sessionStorage.get(loggedInFlag) ? true : false;
        },

        renderLoginText = function (selector, message) {
            loadTemplateFromFile(templateInlay)
                .done(function (templateData) {
                    $.templates({'InlayTemplate': templateData});
                    selector.html(
                        $.render.InlayTemplate({message: message})
                    );
                });
        };

    return {
        init: init
    };

}();