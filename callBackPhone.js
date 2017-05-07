$(function () {
    var CALL_BACK_PHONE_POST_URL = 'https://9j741dyr4k.execute-api.eu-west-2.amazonaws.com/prod/phonesBack';
    var callBackForm = $('#call-back-form');

    callBackForm.on('submit', sendCallBackRequest);

    function sendCallBackRequest(event) {
        event.preventDefault();

        var data = {
            phone: callBackForm.find('#phone').val()
        };

        $.ajax(CALL_BACK_PHONE_POST_URL, {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            crossDomain: true,
            complete: function () {
                callBackForm[0].reset();
            }
        });
    }
});