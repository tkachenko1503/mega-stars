$(function () {
    var CALL_BACK_PHONE_POST_URL = 'https://9j741dyr4k.execute-api.eu-west-2.amazonaws.com/prod/phonesBack';
    var MESSAGE_AFTER_SAVE = 'Спасибо за ваши контактные данные';
    var REGULAR_SBMT_TEXT = 'ОТПРАВИТЬ';
    var SEND_DISABLED_CLASS = 'button_disabled_yes';

    var callBackForm = $('#call-back-form');
    var phoneInput = callBackForm.find('#phone');
    var sendButton = callBackForm.find('button');

    phoneInput.mask('+0 (000) 000 00 00', {
        onComplete: function (cep) {
            sendButton.prop('disabled', false);
            sendButton.removeClass(SEND_DISABLED_CLASS);
        },
        onChange: function (cep){
            if (!sendButton.prop('disabled')) {
                sendButton.prop('disabled', true);
                sendButton.addClass(SEND_DISABLED_CLASS);
            }
        }
    });

    callBackForm.on('submit', sendCallBackRequest);

    function sendCallBackRequest(event) {
        event.preventDefault();

        var phone = phoneInput.val();
        var loader = new Image();

        loader.src = '/loader.svg';
        sendButton.prop('disabled', true);
        sendButton.html(loader);
        // <img id="call-form__loader" src="/loader.svg" />

        $.ajax(CALL_BACK_PHONE_POST_URL, {
            type: 'POST',
            data: JSON.stringify({phone: phone}),
            contentType: 'application/json',
            crossDomain: true,
            complete: function () {            
                callBackForm[0].reset();
                phoneInput.attr('placeholder', MESSAGE_AFTER_SAVE);
                sendButton.addClass(SEND_DISABLED_CLASS);
                sendButton.html(REGULAR_SBMT_TEXT);
            }
        });
    }
});