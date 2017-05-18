$(function () {
    var CALL_BACK_PHONE_POST_URL = 'https://9j741dyr4k.execute-api.eu-west-2.amazonaws.com/prod/phonesBack';
    var MESSAGE_AFTER_SAVE = 'Спасибо за ваши контактные данные';
    var SIMPLE_PHONE_MASK = /^(\+|8)[\d\s]{10,16}$/;

    var callBackForm = $('#call-back-form');
    var phoneInput = callBackForm.find('#phone');
    var sendButton = callBackForm.find('button');

    callBackForm.on('submit', sendCallBackRequest);
    phoneInput.on('input', enableButtonOnValidPhone);

    function isValidPhone(phone) {
        return SIMPLE_PHONE_MASK.test(phone);
    }

    function enableButtonOnValidPhone() {
        sendButton.prop('disabled', !isValidPhone(phoneInput.val()));
    }

    function sendCallBackRequest(event) {
        event.preventDefault();

        var phone = callBackForm.find('#phone').val();

        if (!isValidPhone(phone)) {
            return;
        }

        $.ajax(CALL_BACK_PHONE_POST_URL, {
            type: 'POST',
            data: JSON.stringify({phone: phone}),
            contentType: 'application/json',
            crossDomain: true,
            complete: function () {
                callBackForm[0].reset();
                phoneInput.attr('placeholder', MESSAGE_AFTER_SAVE);
            }
        });
    }
});