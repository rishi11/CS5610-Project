$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();
    function ready() {
        $(".editProfile").click(editProfileHandler);
        $(".editField").hide();
        $(".saveProfile").hide();
        $(".saveProfile").click(saveProfileHandler);
        $(".lastLine").hide();
        $(".changePassword").click(changePasswordhandler);
        DisplayProfile();
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    function changePasswordhandler() {
        var username = getUrlParameter('username');
        window.open("changePassword.html?username=" + username, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
    }

    function DisplayProfile() {

        var username = getUrlParameter('username');
        $('.usernameSelf').html(username);

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getfollowers/" + username,
            success: function (data) {
                //console.log(data);
                if (data == null) {

                } else {
                    $('.appendFollowerList').empty();
                    for (var i = 0 ; i < data.length; i++) {
                        
                            $(".appendFollowerList").append('<a target="_blank" href="otherProfile.html?user=' + username + '&profileUser=' + data[i].follower + '">' + data[i].follower + '</a><br>');
                        
                    }
                }
            }
        });

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getfollowing/" + username,
            success: function (data) {
                //console.log(data);
                if (data == null) {

                } else {
                    $('.appendFollowingList').empty();
                    for (var i = 0 ; i < data.length; i++) {
                        
                            $(".appendFollowingList").append('<a target="_blank" href="otherProfile.html?user=' + username + '&profileUser=' + data[i].following + '">' + data[i].following + '</a><br>');
                        
                    }
                }
            }
        });


        //console.log("User Name recieved = " + username);
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getProfile/" + username,
            success: function (data) {
                //console.log(data);
                var aboutme = data.aboutme;
                var aboutdb = data.aboutdb;
                $('.aboutMe').html(aboutme);
                $('.aboutDashBoard').html(aboutdb);
                $('.aboutMeEdit').val(aboutme);
                $('.aboutDashBoardEdit').val(aboutdb);
            }
        });

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getDisplayDetails/" + username,
            success: function (data) {
                //console.log(data);
                var email = data.email;
                var fname = data.fname;
                var lname = data.lname;
                var phone = data.phone;
                var gender = data.gender;
                $('.firstName').html(fname);
                $('.lastName').html(lname);
                $('.email').html(email);
                $('.phone').html(phone);
                $('.firstNameEdit').val(fname);
                $('.lastNameEdit').val(lname);
                $('.emailEdit').val(email);
                $('.phoneEdit').val(phone);
                
            }
        });
    }

    function editProfileHandler() {

        $('.fixedField').hide();
        $('.editField').show();
        $('.saveProfile').show();
        $('.editProfile').hide();
        $(".lastLine").show();

    }
    function saveProfileHandler() {
        var username = getUrlParameter('username');
        var aboutmeSet = $('.aboutMeEdit').val();
        var aboutDashBoardSet = $('.aboutDashBoardEdit').val();
        var emailToUpdate = $('.emailEdit').val();
        var phoneToUpdate = $('.phoneEdit').val();
        var fnameUpdate = $('.firstNameEdit').val();
        var lnameUpdate = $('.lastNameEdit').val();


        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/setProfile/" + username + "/" + aboutmeSet + "/" + aboutDashBoardSet,
            success: function (data) {
                DisplayProfile();

                $('.fixedField').show();
                $('.saveProfile').hide();
                $('.editField').hide();
                $('.lastLine').hide();
                $('.editProfile').sjow();
            }
        });

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/updateUserdeatils/" + username + "/" + emailToUpdate + "/" + fnameUpdate + "/" + lnameUpdate + "/" + phoneToUpdate,
            success: function (data) {
                DisplayProfile();

                $('.fixedField').show();
                $('.saveProfile').hide();
                $('.editField').hide();
                $('.lastLine').hide();
                $('.editProfile').show();
            }
        });

        
    }
   
});