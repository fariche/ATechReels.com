(function ($) {
    "use strict";

    $(document).ready(function () {
        init_FormValidator();
        CaptchaHandler();


        $("#btn_send").click(function () {
            var txtName = $('#txtName');
            var txtEmail = $('#txtEmail');
            var txtMessage = $('#txtMessage');

            if ($('#form_contact_us').valid()) {
                var ajaxRequest = $.ajax({
                    url: 'php/contact.php',
                    type: "POST",
                    data: { txtName: txtName.val(), txtEmail: txtEmail.val(), txtMessage: txtMessage.val(), txtMailTo: '' },
                    beforeSend: function () {
                        $("#btn_send").button('loading');
                    }
                });

                ajaxRequest.fail(
                function (data) {
                    data = $.parseJSON(data);
                    var $message = '<i class="fa fa-times-circle"></i> ' + data.message;
                    $("#contact_form_message").addClass("alert alert-danger");
                    $("#contact_form_message").html($message);
                    $("#btn_send").button('reset');
                });

                ajaxRequest.done(
                function (response) {
                    var data = $.parseJSON(response);
                    var $message = '<i class="fa fa-' + (data.status == "success" ? "check" : "times") + '-circle"></i> ' + data.message;
                    $("#contact_form_message").addClass("alert alert-" + (data.status == "success" ? "success" : "danger"));
                    $("#contact_form_message").html($message);
                });

                ajaxRequest.always(
                    function () {
                        $("#btn_send").button('reset');
                        $("#form_contact_us")[0].reset();
                        window.setHeight();
                    }
                );
            }
        });
    });

    function CaptchaHandler() {
        var array_vals = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        var array_operators = new Array('+', '+');
        var index = parseInt(Math.random() * 10);
        index = (index == 0) ? index : (index - 1);
        var hidden_val_1 = array_vals[index];
        index = parseInt(Math.random() * 10);
        index = (index == 0) ? index : (index - 1);
        var hidden_val_2 = array_vals[index];
        index = parseInt(Math.random() * 10) % 2;
        var hidden_operator = array_operators[index];
        var result = 0;
        switch (hidden_operator) {
            case '*':
                result = hidden_val_1 * hidden_val_2;
                break;
            default:
                result = hidden_val_1 + hidden_val_2;
                break;
        }

        jQuery('label[for="txtCaptcha"]').html('<strong>What is ' + hidden_val_1 + ' ' + hidden_operator + ' ' + hidden_val_2 + ' = ?</strong>');

        var txtCaptchaResult = '<input type="hidden" id="txtCaptchaResult" />';
        jQuery("body").append(txtCaptchaResult);
        jQuery("#txtCaptchaResult").val(result);
    }

    function init_FormValidator() {
        $('#form_contact_us').validate({
            rules: {
                txtCaptcha: {
                    equalTo: '#txtCaptchaResult'
                }
            },
            messages: {
                txtName: '<i class="fa fa-times-circle"></i> required.',
                txtEmail: {
                    required: '<i class="fa fa-times-circle"></i> required.',
                    email: '<i class="fa fa-exclamation-circle"></i> invalid.'
                },
                txtMessage: '<i class="fa fa-times-circle"></i> required.',
                txtCaptcha: {
                    required: '<i class="fa fa-times-circle"></i> required.',
                    equalTo: '<i class="fa fa-times-circle"></i> wrong.'
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
                $('<div class="clearfix"></div>').insertBefore(error);
                $('<div class="clearfix"></div>').insertAfter(error);
                error.css({ left: element.position().left + (element.width() - error.width()), top: element.position().top + 8, position: 'absolute', 'z-index': 900 });
            },
            invalidHandler: function (event, validator) {
                // 'this' refers to the form
                var errors = validator.numberOfInvalids();
                if (errors) {
                } else {
                }
            }
        });
    }
})(jQuery);