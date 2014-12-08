$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();
    function ready() {
        $(".signIn").click(singInHandler);
    }

    function singInHandler() {
        var userNameEntered = $('.username').val();
        var passwordEntered = $('.password').val();
        //console.log("Entered values : " + passwordEntered + " + " + userNameEntered);
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/credentialVerfication/" + userNameEntered + "/" + passwordEntered,
            success: function (data) {
                //console.log(data);
                if (data.message == "success") {
                    location.href = "html/default.htm?username=" + userNameEntered;
                } else {
                    alert("Invalid Credentials");
                }
            }
        });
    }

});