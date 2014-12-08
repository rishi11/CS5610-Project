var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongojs = require('mongojs');
var mongodbConnectionString = "mongodb://admin:5-wht7em3thg@127.4.170.130:27017/project";

var nodemailer = require("nodemailer");

var fs = require('fs');

if (typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined") {
    mongodbConnectionString = "userDB";
}

var db = mongojs(mongodbConnectionString, ['userDB']);
var dbdashboard = mongojs(mongodbConnectionString, ['dashboardDB']);
var offlineMsgDb = mongojs(mongodbConnectionString, ['messagesDB']);
var eventDB = mongojs(mongodbConnectionString, ['eventsDB']);
var usercommentsDB = mongojs(mongodbConnectionString, ['usercommentsDB']);
var followerDB = mongojs(mongodbConnectionString, ['followerDB']);

// Show environment variables Temp Function
app.get('/envVar', function (req, res) {
    res.json(process.env);
});




//Set default page
app.use(express.static(__dirname + '/public'));


//*****************************************************************************************
// SERVICES FOR USER LOGIN AND OTHER FUNCTIONALITIES
//*****************************************************************************************


// Setting up mail transporter
smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        XOAuth2: {
            user: "XXXXXX-PRIVARE-DETAILS",
            clientId: "XXXXXXX- PRIVATE DETAILS -XXXXXXXXXX",
            clientSecret: "XXXXXXXX - PRIVATE DETAILS - XXXXXXXX",
            refreshToken: "XXXXXXXX - PRIVATE DETAILS - XXXXXXXX"
        }
    }


});


// get all other users
app.get('/getallusernames/:username', function (req, res) {

    var usernameSelf = req.params.username;
    db.userDB.find(function (err, data) {
        if (data == null) {
            res.json({ message: "No User" });
        } else {
            var allOtherUserArray = [];
            for (var i = 0 ; i < data.length; i++) {
                if (data[i].username != usernameSelf) {
                    allOtherUserArray.push(data[i].username);
                }
            }
            res.json({ allOtherUserList: allOtherUserArray });
        }
    });
});


//Check Login credentials
app.get('/credentialVerfication/:username/:password', function (req, res) {
    var recievedUserName = req.params.username;
    var recievedPassword = req.params.password;
    //console.log("Credentials obtained : " + recievedUserName + " and " + recievedPassword);
    //res.json({ username: recievedUserName, password: recievedPassword });
    db.userDB.findOne({
        query: { username: recievedUserName }
    }, function (err, data) {
        if (data == null) {
            res.json("User not there");
        } else {
            //console.log(data.password);
            if (data.password == recievedPassword) {
                //console.log("Login Success");
                res.json({ message: "success" });
            } else {
                res.json({ message: "not success" });
            }
        }
    });

});

// Update User details

app.get('/updateUserdeatils/:username/:email/:lname/:fname/:phone', function (req, res) {
    var userUpadete = req.params.username;
    var emailUpdate = req.params.email;
    var fnameUpdate = req.params.fname;
    var lnameUpdate = req.params.lname;
    var phoneNumberUpdate = req.params.phone;
    db.userDB.findOne({
        query: { username: userUpadete }
    }, function (err, data) {
        if (data != null) {
            db.userDB.findAndModify({
                query: { username: userUpadete }, update: { $set: { email: emailUpdate, fname : fnameUpdate, lname : lnameUpdate, phoneNumber : phoneNumberUpdate } }
            }, function (err, data) {
                res.json({ message: "updated" });
            });
        } else {
            res.json({message : "nouser"});
        }
    });
});


// Register the new USER for validation
app.get('/userRegistration/:userDetails', function (req, res) {
    var userDetails = req.params.userDetails;
    //console.log("Details Recieved : " + userDetails);
    var userObj = JSON.parse(userDetails);
    //console.log("Details as object : " + userObj);
    var userNameCheck = userObj.username;
    //console.log("Given User Name : " + userNameCheck);
    //res.send(userDetails);
    db.userDB.findOne({
        query: { username: userNameCheck }
    }, function (err, data) {
        if (data == null) {
            db.userDB.insert(userObj, function (err, data) {
                var emailStored = userObj.email;
                var password = userObj.password;
                var username = userObj.username;
                var emailBody = "Hi " + username + ",<br><br>" + "You have succesfully registered.<br>Your user name is : " + username + "<br>Your password to login is " + password + "<br><br>" + "Thank You, <br>Dashboard Team";
                var mailOptions = {
                    from: 'CS5610project@gmail.com', // sender address
                    to: emailStored, // list of receivers
                    subject: 'Welcome Mail', // Subject line
                    text: '', // plaintext body
                    html: emailBody  // html body
                };
                smtpTrans.sendMail(mailOptions);
                res.json({ message: 'success' });
            });
        } else {

            res.json({ message: 'Username already exists.' });
        }
    });
});







// Password recovery from mail
app.get('/passwordResetMail/:username', function (req, res) {

    var usernameRecovery = req.params.username;
    //console.log("The email will be sent to : " + usernameRecovery);

    db.userDB.findOne({
        query: { username: usernameRecovery }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "No user name exists" });
        } else {
            var emailStored = data.email;
            //console.log("Mailed : " + emailStored);
            var password = data.password;
            var username = data.username;
            var emailBody = "Hi " + username + ",<br><br>" + "Your current password is : " + password + "<br><br>" + "Happy To Help, <br>Dashboard Team";
            var mailOptions = {
                from: 'CS5610project@gmail.com', // sender address
                to: emailStored, // list of receivers
                subject: 'Password Recovery', // Subject line
                text: '', // plaintext body
                html: emailBody  // html body
            };
            smtpTrans.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                } else {
                    res.json({ message: "mailed" });
                }
            });
        }
    });

});




// Password recovery from security questions
app.get('/passwordRecoveryAnswers/:ans1/:ans2/:ans3/:username', function (req, res) {

    var answer1provided = req.params.ans1;
    var answer2provided = req.params.ans2;
    var answer3provided = req.params.ans3;
    var usernameRecovery = req.params.username;

    db.userDB.findOne({
        query: { username: usernameRecovery }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "Username is invalid" });
        } else {
            var answer1stored = data.answer1;
            var answer2stored = data.answer2;
            var answer3stored = data.answer3;
            //console.log("The stored answers are  : " + answer1stored + " , " + answer2stored + " & " + answer3stored);
            if ((answer1provided == answer1stored) && (answer2provided = answer2stored) && (answer3provided == answer3stored)) {
                res.json({ message: "Answers are correct" });
            } else {
                res.json({ message: "Answers are not correct" });
            }
        }
    });
});



//Update password
app.get('/passwordChangeRequest/:oldpassword/:newpassword/:username', function (req, res) {
    var currentPassword = req.params.oldpassword;
    var newpassword = req.params.newpassword;
    var usernameUpdate = req.params.username;
    if (currentPassword == newpassword) {
        res.json({ message: "The new password cannot be same as the existing one." });
    } else {
        db.userDB.findAndModify({
            query: { username: usernameUpdate }, update: { $set: { password: newpassword } }
        }, function (err, doc) {
            res.json({ message: "Password Updated" });
        });
    }
});




// Set new password
app.get('/passwordSetRequest/:newpassword/:username', function (req, res) {
    var newpassword = req.params.newpassword;
    var usernameUpdate = req.params.username;

    db.userDB.findAndModify({
        query: { username: usernameUpdate }, update: { $set: { password: newpassword } }
    }, function (err, doc) {
        res.json({ message: "Password Set" });
    });

});



// Check User Name if it exists
app.get('/usernameExists/:username', function (req, res) {
    var userNameToCheck = req.params.username;
    //console.log("User Name To Check : " + userNameToCheck);
    db.userDB.findOne({
        query: { userneme: userNameToCheck }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "Username is valid." });
        } else {
            res.json({ message: "User name already taken." })
        }
    });
});

// Get display details of user

app.get('/getDisplayDetails/:username', function (req, res) {
    var user = req.params.username;
    db.userDB.findOne({
        query: { username: user }
    }, function (err, data) {
        //console.log(data);
        var fnameToSend = data.fname;
        var lnameToSend = data.lname;
        var phoneToSend = data.phoneNumber;
        var genderToSend = data.gender;
        var emailToSend = data.email;
        var dataToSend = {
            lname: lnameToSend,
            fname: fnameToSend,
            email: emailToSend,
            phone: phoneToSend,
            gender : genderToSend
        }
        //console.log(fnameToSend + lnameToSend);
        res.json(dataToSend);
    });
});

app.get('/checkuser', function (req, res) {
    var user = "rishi11"
    db.userDB.findOne({
        query: { username: user }
    }, function (err, data) {
        if (data == null) {
            res.json("User not there");
        } else {
            res.json("User there");
        }
    });
});



//Retrieve security questions for users
app.get('/userSecurityQuestions/:username', function (req, res) {
    var usernameSecurityQuestion = req.params.username;
    //console.log("User name recieved for security questions : " + usernameSecurityQuestion);
    db.userDB.findOne({
        query: { username: usernameSecurityQuestion }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "Username is invalid." });
        } else {
            var question1 = data.securityQ1;
            var question2 = data.securityQ2;
            var question3 = data.securityQ3;
            res.json({ message: "", ques1: question1, ques2: question2, ques3: question3 });
        }
    });
});


// **************************************************************************************************************
// DASHBOARD SERVICES
// **************************************************************************************************************


app.get('/dashboardSave/:dashboardObj/:dashBoardUser', function (req, res) {
    var dashboardRecieved = req.params.dashboardObj;
    var dashBoardUserSave = req.params.dashBoardUser;
    //console.log(dashboardRecieved);
    //console.log(dashBoardUserSave)
    var objToStore = JSON.parse(dashboardRecieved);
    db.userDB.findOne({
        query: { username: dashBoardUserSave }
    }, function (err, data) {
        if (data != null) {
            //console.log("There is the user with given user id");
            dbdashboard.dashboardDB.findOne({
                query: { dashBoardUser: dashBoardUserSave }
            }, function (err, data) {
                if (data != null) {
                    //console.log("There is dashboard already there");
                    dbdashboard.dashboardDB.remove({
                        dashBoardUser: dashBoardUserSave
                    }, function (err, doc) {
                        //console.log(doc + " dash board removed");
                        dbdashboard.dashboardDB.insert(objToStore, function (err, data) {
                            //console.log("Dashboard saved after deleting");
                            res.json(data);
                        });
                    });
                } else {
                    dbdashboard.dashboardDB.insert(objToStore, function (err, data) {
                        //console.log("dashboard saved initial");
                        res.json({ message: "success" });
                    });
                }
            });
        } else {
            res.json({ message: "no user" });
        }
    })
    /*
    var checkOBJ = JSON.parse(dashboardRecieved);
    dbdashboard.dashboardDB.insert(checkOBJ, function (err, data) {
        console.log("dashboard saved initial");
        console.log(data);
        console.log(err);
        res.json(data);
    });
    */
});

app.get('/dashcheck', function (res, req) {
    dbdashboard.dashboardDB.findOne({
        query: { dashBoardUser: "rishi11" }
    }, function (err, data) {
        if (data == null) {
           // console.log("a");
        } else {
            res.json(data);
        }
    });
});



app.get('/dashboardGet/:usernameParam', function (req, res) {

    var usernameForDashboard = req.params.usernameParam;

    dbdashboard.dashboardDB.findOne({
        query: { dashBoardUser: usernameForDashboard }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "initial store not there" });
        } else {
            res.json(data);
        }
    });
});


//******************************************************************************************************
// EVENTS SERVICES
//******************************************************************************************************

/*
app.get('/eventStore/:event/:username', function (req, res) {

    var eventObj = req.params.event;
    var usernameForEvent = req.params.username;


    db.userDB.findOne({
        query : {username : usernameForEvent}
    }, function (err, data) {
        if (data == null) {
            res.json({ message : "Invalid Username" });
        } else{
            eventDB.eventsDB.findOne({
                query: { username: usernameForEvent }
            }, function (err, data) {
                if (data == null) {
                    //console.log("No stored events yet");
                    var eventEntry = {
                        eventlist: eventObj,
                        username: usernameForEvent
                    }

                    eventDB.eventsDB.insert(eventEntry, function (err, data) {
                        res.json({message : "success"});
                    });
                } else {
                    console.log("Events replace");
                    var currentevents = data.eventlist;
                    console.log(currentevents);
                    eventDB.eventsDB.remove({ username: usernameForEvent }, function (err, doc) {
                        eventDB.eventsDB.insert(currentevents, function (err, data) {
                            res.json({message : "success"});
                        });
                    });
                }
            });
        }
    });
});
*/

app.get('/eventStore/:time/:name/:username', function (req, res) {
    var usernameToStoreEvent = req.params.username;

    var eventdate = req.params.time;

    var eventName = req.params.name;

    var eventObj = {
        eventName: eventName,
        eventDate: eventdate,
        eventUser: usernameToStoreEvent
    }

    //console.log("Event : " + eventObj);

    db.userDB.findOne({
        query: { username: usernameToStoreEvent }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "Invalid Username" });
        } else {
            eventDB.eventsDB.insert(eventObj, function (err, data) {
                res.json({ message: "success" });
            });
        }
    });

});

app.get('/geteventlist/:username', function (req, res) {

    var usernameToGetEventlist = req.params.username;
    db.userDB.findOne({
        query: { username: usernameToGetEventlist }
    }, function (err, data) {
        if (data == null) {
            res.json({ message: "Invalid Username" });
        } else {
            eventDB.eventsDB.find({ eventUser: usernameToGetEventlist }, function (err, data) {
                if (data == null) {
                    res.json({ message: "noevents" });
                } else {
                    //console.log(data);
                    res.json(data);
                }
            });
        }
    });
});

// Temp Function
app.get('/emptyevent/:username', function (req, res) {
    var usernameTodelete = req.params.username;
    eventDB.eventsDB.remove({
        username: usernameTodelete
    }, function (err, doc) {
        res.json(doc);

    });
});



//**************************************************************************************************************
// OFFLINE MESSAGES SERVICE
//**************************************************************************************************************

app.get('/sendofflinemsg/:from/:to/:message', function (req, res) {
    var touser = req.params.to;
    var fromuser = req.params.from;
    var messageContent = req.params.message;

    offlineMsgDb.messagesDB.find(
        { tousername: touser }
    , function (err, data) {
        if (data == null) {
            //console.log("First time entry");
            var initialEntry = {
                tousername: touser,
                fromusername: fromuser,
                messageContent: messageContent
            }
            offlineMsgDb.messagesDB.insert(initialEntry, function (err, data) {
                res.json({ message: "success" });
            });
        } else {
            var initialEntry = {
                tousername: touser,
                fromusername: fromuser,
                messageContent: messageContent
            }
            //console.log("Already there are messages");
            offlineMsgDb.messagesDB.insert(initialEntry, function (err, data) {
                res.json({ message: "success" });
            });
        }
    });

});


app.get('/getofflinemessages/:username', function (req, res) {
    var usernameFormessages = req.params.username;
    //console.log("I am here");
    offlineMsgDb.messagesDB.find(
       { tousername: usernameFormessages }
    , function (err, data) {
        if (data == null) {
            res.json({ message: "No messages" });
        } else {

            offlineMsgDb.messagesDB.remove({ tousername: usernameFormessages });
            res.json(data)
        }
    });
});


app.get('/seeall', function (req, res) {
    offlineMsgDb.messagesDB.find(function (err, data) { res.json(data) });
});

app.get('/deletemsg', function (req, res) {
    offlineMsgDb.messagesDB.remove({ tousername: "rishi11" }, function (err, doc) { res.json(doc) });
});


//***************************************************************************************************
// User Extra Details
//***************************************************************************************************


app.get('/getProfile/:username', function (req, res) {
    var userprofile = req.params.username;
    usercommentsDB.usercommentsDB.findOne({
        query: { usernameComments: userprofile }
    }, function (err, data) {
        if (data != null) {
            //console.log("Entry is There");
            res.json(data);

        } else {
            res.json({ message: "no profile" });
        }
    });
});

app.get('/setProfile/:username/:aboutme/:aboutdb', function (req, res) {
    var usernameSetprofile = req.params.username;
    var aboutmeSet = req.params.aboutme;
    var aboutdbSet = req.params.aboutdb;
    db.userDB.findOne({
        query: { username: usernameSetprofile }
    }, function (err, data) {
        if (data != null) {
            usercommentsDB.usercommentsDB.remove({
                usernameComments: usernameSetprofile
            }, function (err, doc) {
                var userProfileObject = {
                    usernameComments: usernameSetprofile,
                    aboutme: aboutmeSet,
                    aboutdb : aboutdbSet
                }
                usercommentsDB.usercommentsDB.insert(userProfileObject, function (err, data) {
                    res.json({ message: "success" });
                });
            });
        } else {
            res.json({ message: "no profile" });
        }
    });
});

//*************************************************************
// FOLLOWERS and FOLLOWING SERVICES
//*************************************************************


app.get('/setfollower/:follower/:following', function (req, res) {
    var follower = req.params.follower;
    var following = req.params.following;
    var followpair = {
        follower: follower,
        following : following
    }
    followerDB.followerDB.find({
        query: { follower: follower, following: following }
    }, function (err, data) {
        //console.log(data);
        if (data.length == 0) {
            //console.log("in if");
            followerDB.followerDB.insert(followpair, function (err, data) {
                res.json(data);
            })
        } else {
            //console.log("else");
            res.json({ message: "already following" });
        }
    });
});

app.get('/getfollowers/:user', function (req, res) {
    var username = req.params.user;
    followerDB.followerDB.find({
        query: { following: username }
    }, function (err, data) {
        res.json(data);
    });
});

app.get('/getfollowing/:user', function (req, res) {
    var username = req.params.user;
    followerDB.followerDB.find({
        query: { follower : username }
    }, function (err, data) {
        res.json(data);
    });
});

app.get('/checkapair/:follower/:following', function (req, res) {
    var follower = req.params.follower;
    var following = req.params.following;
    followerDB.followerDB.find({
        query: { follower: follower, following : following }
    }, function (err, data) {
        //console.log(data.length);
        if (data.length > 0) {
            res.json({message : "yes"})
        } else {
            res.json({message : "no"})
        }
    });
});

app.get('/unfollow/:follower/:following', function (req, res) {
    var follower = req.params.follower;
    var following = req.params.following;
    followerDB.followerDB.remove({ follower: follower, following: following }, function (err, doc) {
        res.json(doc);
    });
});




app.listen(port, ipaddress);