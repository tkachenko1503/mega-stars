$(function () {
    var CALL_BACK_PHONE_POST_URL = 'https://9j741dyr4k.execute-api.eu-west-2.amazonaws.com/prod/phonesBack';
    var MESSAGE_AFTER_SAVE = 'Спасибо за ваши контактные данные';

    var callBackForm = $('#call-back-form');
    var phoneInput = callBackForm.find('#phone');
    var sendButton = callBackForm.find('button');

    phoneInput.mask('+0 (000) 000 00 00', {
        onComplete: function (cep) {
            sendButton.prop('disabled', false);
        },
        onChange: function (cep){
            if (!sendButton.prop('disabled')) {
                sendButton.prop('disabled', true);
            }
        }
    });

    callBackForm.on('submit', sendCallBackRequest);

    function sendCallBackRequest(event) {
        event.preventDefault();

        var phone = phoneInput.val();

        $.ajax(CALL_BACK_PHONE_POST_URL, {
            type: 'POST',
            data: JSON.stringify({phone: phone}),
            contentType: 'application/json',
            crossDomain: true,
            complete: function () {
                callBackForm[0].reset();
                phoneInput.attr('placeholder', MESSAGE_AFTER_SAVE);
                sendButton.prop('disabled', true);
            }
        });
    }
});