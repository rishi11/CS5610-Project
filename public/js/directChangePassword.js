$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();

    function ready() {
        $(".setNewPswd").click(setNewPasswordHandler);
    }
    function setNewPasswordHandler() {
        var params = {};

        if (location.search) {
            var parts = location.search.substring(1).split('&');

            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1] || true;
            }
        }

        var username = params.username;
        //console.log("Username recieved by query string : " + username);
        var newPassword = $(".newpassword").val();
        var confirmnewpassword = $(".confirmnewpassword").val();

        var errorMessage = null;
        if (passwordRequirements(newPassword)) {
            errorMessage = "Password should have atleast one spaecial character, one upper case letter, one lower case letter and one digit and should be of 8-15 characters";
            //console.log(errorMessage);
            alert(errorMessage);
            return;
        } else if (newPassword != confirmnewpassword) {
            errorMessage = "The two passwords did not match";
            //console.log(errorMessage);
            alert(errorMessage);
            return;
        } else {
            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/passwordSetRequest/" + newPassword + "/" + username,
                success: function (data) {
                    if (data.message == "Password Set") {
                        alert("Password Updated");
                        location.replace("../index.html");
                        
                    }
                    else {
                        alert("The old and new passwords cant be same");
                    }

                }
            });
        }


    }

    
    function passwordRequirements(passwordEntered) {
        var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (passwordEntered.match(passwordRegExp)) {
            return false;
        } else {
            return true;
        }
    }
    

});