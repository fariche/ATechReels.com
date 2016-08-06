(function ($) {
    "use strict";

    $(document).ready(function () {
        init_SubscribeFormValidator();

        $("#btn_subscribe").click(function () {
            var txtEmail = $('#txtSubscriberEmail');
            if ($('#form_subscribe').valid()) {
                var ajaxRequest = $.ajax({
                    url: 'php/subscribe.php',
                    type: "POST",
                    data: { email: txtEmail.val() },
                    beforeSend: function () {
                        $("#btn_subscribe").button('loading');
                    }
                });

                ajaxRequest.fail(function (data) {
                    // error
                    data = $.parseJSON(data);
                    var $message = '<i class="fa fa-times-circle"></i> ' + data.message;
                    $("#subscribe_form_message").addClass("alert alert-danger");
                    $("#subscribe_form_message").html($message);
                    $("#btn_subscribe").button('reset');
                });

                ajaxRequest.done(function (response) {
                    // done
                    var data = $.parseJSON(response);
                    var $message = '<i class="fa fa-' + (data.status == "success" ? "check" : "times") + '-circle"></i> ' + data.message;
                    $("#subscribe_form_message").addClass("alert alert-" + (data.status == "success" ? "success" : "danger"));
                    $("#subscribe_form_message").html($message);
                });

                ajaxRequest.always(function () {
                    // complete
                    $("#btn_subscribe").button('reset');
                    $("#form_subscribe")[0].reset();
                    window.setHeight();
                });
            }
        });
    });

    function init_SubscribeFormValidator() {
        $('#form_subscribe').validate({
            messages: {
                txtSubscriberEmail: {
                    required: '<i class="fa fa-times-circle"></i> required.',
                    email: '<i class="fa fa-exclamation-circle"></i> invalid.</b>'
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