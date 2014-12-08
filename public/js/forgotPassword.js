$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();

    function ready() {
        $(".securityQuestionMethod").hide();
        $(".emailMethod").hide();
        $(".methodQuestion").click(questionMethodHandler);
        $(".methodEmail").click(emailMethodHandler);
        $(".submitAnswers").click(submitAnswersHandler);
        $(".sendEmail").click(sendEmailhandler);
    }

    function questionMethodHandler() {
        $(".emailMethod").hide();
        retrieveQuestionValue();


    }

    function emailMethodHandler() {
        $(".securityQuestionMethod").hide();
        $(".emailMethod").show();
    }
    function submitAnswersHandler() {
        var answer1 = $(".answer1").val();
        var answer2 = $(".answer2").val();
        var answer3 = $(".answer3").val();
        var usernameResetValue = $(".usernameResetValue").val();
        if (usernameResetValue == "") {
            alert("Username cannot be left blank");
        } else {
            //console.log("Answers are " + answer1 + " & " + answer2 + " & " + answer3 + " respectively");
            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/passwordRecoveryAnswers/" + answer1 + "/" + answer2 + "/" + answer3 + "/" + usernameResetValue,
                success: function (data) {
                    if (data.message == "Answers are correct") {
                        location.replace("directChangePassword.html?username=" + usernameResetValue);
                    } else {
                        alert(data.message);
                    }
                }
            });
            
        }
        

    }
    function sendEmailhandler() {
        var usernameResetValue = $(".usernameResetValue").val();
        if (usernameResetValue == "") {
            alert("Username cannot be left blank");
        } else {
            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/passwordResetMail/" + usernameResetValue,
                success: function (data) {
                    alert("Email is sent to registered mail. Please check");
                }
            });
        }
    }
    function retrieveQuestionValue() {
        var usernameResetValue = $(".usernameResetValue").val();
        if (usernameResetValue == "") {
            alert("Username cannot be left blank");
        } else {
            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/userSecurityQuestions/" + usernameResetValue,
                success: function (data) {
                    if (data.message == "" || data.message == null) {
                        $(".question1").html(data.ques1);
                        $(".question2").html(data.ques2);
                        $(".question3").html(data.ques3);
                        $(".securityQuestionMethod").show();
                    } else {
                        alert("Inavlid User Name");
                    }
                    
                }
            });


        }
    }

    

});