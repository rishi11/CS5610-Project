$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();
    function ready() {
        $(".createAccount").click(createAccountHandler);
        $(".resetFields").click(resetFieldsHandler);
        implementCaptcha();
    }

    function createAccountHandler() {
        var firstNameEntered = $('.firstName').val();
        var secondNameEntered = $('.lastName').val();
        var emailEntered = $('.email').val();
        var userNameEntered = $('.username').val();
        var passwordEntered = $('.password').val();
        var password2Entered = $('.password2').val();
        var phoneNumberEntered = $('.phonenumber').val();
        var genderSelected = $('.gender').val();
        var question1Selected = $('.question1').val();
        var question2Selected = $('.question2').val();
        var question3Selected = $('.question3').val();
        var answer1Entered = $('.answer1').val();
        var answer2Entered = $('.answer2').val();
        var answer3Entered = $('.answer3').val();
        //console.log("Name : " + firstNameEntered + " + " + secondNameEntered);
        //console.log("User name password : " + userNameEntered + " + " + passwordEntered + " password 2 : " + password2Entered);
        //console.log("email and fone : " + emailEntered + " + " + phoneNumberEntered);
        //console.log("gender : " + genderSelected);
        //console.log("Answer 1 : " + question1Selected + " + " + answer1Entered);
        //console.log("Answer 2 : " + question2Selected + " + " + answer2Entered);
        //console.log("Answer 3 : " + question3Selected + " + " + answer3Entered);
        var errorMessage = "";
        if (secondNameEntered == "") {
            errorMessage = "Last Name cannot be left blank";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (firstNameEntered == "") {
            errorMessage = "First Name cannot be left blank";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (userNameEntered == ""){
            errorMessage = "User name cannot be left blank";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (passwordEntered == "") {
            errorMessage = "Password cannot be left blank";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (passwordRequirements(passwordEntered)) {
            errorMessage = "Password should have atleast one spaecial character, one upper case letter, one lower case letter and one digit and should be of 8-15 characters";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (password2Entered == "") {
            errorMessage = "Please re-enter the password";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (passwordEntered != password2Entered) {
            errorMessage = "Two password did not match";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (emailEntered == "") {
            errorMessage = "Email cannot be left blank.";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if (phoneNumberEntered == "") {
            errorMessage = "Phone number cannot be left blank";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if ((answer1Entered == "") || (answer2Entered == "") || (answer3Entered == "")) {
            errorMessage = "Please answer all the security questions";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else if(!(compareCaptcha())) {
            errorMessage = "Please insert text of image properly";
            //console.log(errorMessage);
            $('.errormsg').html("");
            $('.errormsg').html(errorMessage);
            return;
        } else {
            var userObj = {
                fname : firstNameEntered,
                lname: secondNameEntered,
                username: userNameEntered,
                password: passwordEntered,
                email: emailEntered,
                phoneNumber: phoneNumberEntered,
                gender : genderSelected,
                securityQ1: question1Selected,
                answer1: answer1Entered,
                securityQ2: question2Selected,
                answer2: answer2Entered,
                securityQ3: question3Selected,
                answer3 : answer3Entered
            }
            var jsonUserObj = JSON.stringify(userObj);
            //console.log("JSOn user obj : " + jsonUserObj);
            $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/userRegistration/" + jsonUserObj,
            success: function (data) {
                if (data.message == "success") {
                    alert("Thank You for joining Dashboard. Check your mail. You can now log-in");
                    location.href = "../index.html";
                }
                else {
                    alert("Username already exists");
                }
                
            }
        });
        
        }


        
}
    function resetFieldsHandler() {
        $('.firstName').val("");
        $('.lastName').val("");
        $('.email').val("");
        $('.phonenumber').val("");
        $('.username').val("");
        $('.password').val("");
        $('.password2').val("");
        $('.anwser1').val("");
        $('.answer2').val("");
        $('.answer3').val("");
        $('.question1').val("");
        $('.question2').val("");
        $('.question3').val("");
    }

    function passwordRequirements(passwordEntered) {
        var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (passwordEntered.match(passwordRegExp)) {
            return false;
        } else {
            return true;
        }
    }

   
    function implementCaptcha() {
            var x = Math.floor((Math.random() * 6) + 1);
            var imagesource = "../images/captcha/image" + x + ".JPG";
            //console.log(imagesource);
            $('.captchaImg').attr('src', imagesource);
    }

    function compareCaptcha(){
        var arrayImage = ["320","342","310A","264","166","242"];
        var enteredVal = $(".captchaValue").val();
        var displayedImage = $(".captchaImg").attr('src');
        //console.log(displayedImage);
        var displayedImageSplit = displayedImage.split('/');
        //console.log(displayedImageSplit[3]);
        var imageName = displayedImageSplit[3].split('.');
        //console.log(imageName[0]);
        var imageNumber = imageName[0].split('e');
        if (enteredVal == arrayImage[imageNumber[1]-1]) {
            //console.log(true);
            return true;
        } else {
            //console.log(false);
            false;
        }
    }

   
});