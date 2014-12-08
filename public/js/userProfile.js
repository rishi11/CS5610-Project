$(document).ready(function () {

    //console.log("Script ready");
    // Ready Function
    ready();
    function ready() {
        DisplayUserProfile();
        $('.follow').hide();
        $('.unfollow').hide();
        $('.follow').click(followHandler);
        $('.unfollow').click(unfollowHandler);
        $('.sendMessage').click(sendMessageHandler);
    }

    function followHandler() {
        //console.log("Follow");
        var followThis = getUrlParameter('profileUser');
        var followWill = getUrlParameter('user');
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/setfollower/" + followWill + "/" + followThis,
            success: function (data) {
               
                    $('.follow').hide();
                    $('.unfollow').show();
                    $.ajax({
                        dataType: "json",
                        url: "http://project-cs5610fall14.rhcloud.com/getfollowers/" + followThis,
                        success: function (data) {
                            //console.log(data);
                            if (data == null) {

                            } else {
                                $('.appendFollowersList').empty();
                                for (var i = 0 ; i < data.length; i++) {
                                    //console.log("user : " + data[i].follower);
                                    if (followWill != data[i].follower) {
                                        $(".appendFollowersList").append('<a target="_blank" href="otherProfile.html?user=' + followWill + '&profileUser=' + data[i].follower + '">' + data[i].follower + '</a><br>');
                                    } else {
                                        $(".appendFollowersList").append('<a target="_blank" href="selfProfile.html?username=' + data[i].follower +'">' + data[i].follower + '</a><br>');

                                    }
                                   
                                }
                            }
                        }
                    });
                    alert("You are now following " + followThis);
            
            }
        });
       
    }

    function unfollowHandler() {
        //console.log("Unfollow");
        var followThis = getUrlParameter('profileUser');
        var followWill = getUrlParameter('user');
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/unfollow/" + followWill + "/" + followThis,
            success: function (data) {

                $('.follow').show();
                $('.unfollow').hide();
                $.ajax({
                    dataType: "json",
                    url: "http://project-cs5610fall14.rhcloud.com/getfollowers/" + followThis,
                    success: function (data) {
                        //console.log(data);
                        if (data == null) {

                        } else {
                            $('.appendFollowersList').empty();
                            for (var i = 0 ; i < data.length; i++) {
                                if (followWill != data[i].follower) {
                                    $(".appendFollowersList").append('<a target="_blank" href="otherProfile.html?user=' + followWill + '&profileUser=' + data[i].follower + '">' + data[i].follower + '</a><br>');
                                } else {
                                    $(".appendFollowersList").append('<a target="_blank" href="selfProfile.html?username=' + data[i].follower + '">' + data[i].follower + '</a><br>');

                                }
                            }
                        }
                    }
                });
                alert("You are now not following " + followThis);

            }
        });
        $('.follow').show();
        $('.unfollow').hide();
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


    function DisplayUserProfile() {

        var username = getUrlParameter('profileUser');
        var loggedusername = getUrlParameter('user');
        //console.log("User Name recieved = " + username);
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getProfile/" + username,
            success: function (data) {
                //console.log(data);
                var aboutme = data.aboutme;
                var aboutdb = data.aboutdb;
                $('.aboutUser').html(aboutme);
                $('.userAboutDashBoard').html(aboutdb);
            }
        });

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/checkapair/" + loggedusername + "/" + username,
            success: function (data) {
                console.log(data);
                if (data.message == "yes") {
                    $('.unfollow').show();
                } else if (data.message == "no") {
                    $('.follow').show();
                }
            }
        });

        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getfollowers/" + username,
            success: function (data) {
                //console.log(data);
                if (data == null) {

                } else {
                    $('.appendFollowersList').empty();
                    for (var i = 0 ; i < data.length; i++) {
                        if (loggedusername != data[i].follower) {
                            $(".appendFollowersList").append('<a target="_blank" href="otherProfile.html?user=' + loggedusername + '&profileUser=' + data[i].follower + '">' + data[i].follower + '</a><br>');
                        } else {
                            $(".appendFollowersList").append('<a target="_blank" href="selfProfile.html?username=' + data[i].follower + '">' + data[i].follower + '</a><br>');

                        }
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
                        if (loggedusername != data[i].following) {
                            $(".appendFollowingList").append('<a target="_blank" href="otherProfile.html?user=' + loggedusername + '&profileUser=' + data[i].following + '">' + data[i].following + '</a><br>');
                        } else {
                            $(".appendFollowingList").append('<a target="_blank" href="selfProfile.html?username=' + data[i].following + '">' + data[i].following + '</a><br>');

                        }
                    }
                }
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
                $('.appendName').html(fname + " " + lname);
                $('.appendFname').html("About " + fname);
                $('.appendFnameAbout').html(fname + "'s view about dashboard");
                $('.appendFollowers').html("Followers of " + fname)
                $('.appendFollowing').html(fname + " is Following")
                $('.appendPhone').html("Phone Number : " + phone);
                $('.appendEmail').html("Email : " + email);
                $('.appendGender').html("Gender : " + gender);
            }
        });
    }

    function sendMessageHandler() {
        var msgContent = $('.offlineMessage').val();
        var to = getUrlParameter('profileUser');
        var from = getUrlParameter('user');
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/sendofflinemsg/" + from + "/" + to + "/" + msgContent,
            success: function (data) {
                if (data.message == "success") {
                    alert("Message Sent");
                }
            }
        });
    }

    
   
});