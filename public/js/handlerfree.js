
$(document).ready(function () {
    ready();
    function ready() {
        $("#fullversion").hide();
        $(".cloneWidget").hide();
        $('.deleteIcon').hide();
        $(".calendarAdd").click(addCalendar);
        $(".eventManagerAdd").click(getFullVersion);
        $(".weatherAdd").click(addWeather);
        $(".googlerAdd").click(addGoogler);
        $(".stickyAdd").click(addSticky);
        $(".calculatorAdd").click(addCalculator);
        $(".offlineMessengerAdd").click(getFullVersion);
        $(".friendFinder").click(getFullVersion);
        $(".addImageWidget").click(addImageWidgetHandler);
        $(".clockAdd").click(addClock);
        $(".mapsAdd").click(addMaps);
        $(".deleteWidget").click(deleteWidgetHandler);
        $(".saveWidget").click(getFullVersion);
        $(".addAlarm").click(getFullVersion);
        $(".wind").click(flipWeatherWidget);
        $(".set").click(setWeatherWidget);
        $(".loadWidget").click(loadWidgetHandler);
        $(".addTTS").click(addTtsHandler);
        $(".addYoutube").click(addYouTubeHandler);
        $(".settings").hide();
        $(".settingPage").click(settingDivHandler);
        $("input[name='position']").change(toolBarPosition);
        $(".toolbarTop").hide();
        $(".toolbarRight").hide();
        $(".toolbarLeft").hide();
        $(".exitPage").click(exitPageWithoutSaveHandler);
        $(".profilePage").click(getFullVersion);
        $(".playSpeech").hide();
        $(".imageContent").hide();
        $(".addWidgetIcon").click(showAddWidgetTab);
        $(".cancelCover").click(cancelCoverHandler);
        $(".deleteAllWidgets").click(deleteAllWidgetHandler);
        $(".addNotify").click(getFullVersion)
        $(".send").hide();
        $(".noSend").hide();
        $(".replyContent").hide();
        $(".hiddenMaps").hide();
        //getEventHandlerJquery();
        //getAllUsers();
        //toolBarPosition();
        //loadWidgetHandler();
        
    }

    function getFullVersion() {
        //$("#fullversion").dialog({
        //    autoOpen: false,
        //    modal: true,
        //    resizable: false,
        //    buttons: {
        //        "Load": function () {
        //            $("#fullversion").dialog("close");
        //            loadPage();
        //        },
        //        "Cancel": function () { $("#fullversion").dialog("close"); }
        //    },
           
        //});
        $("#fullversion").dialog({
            dialogClass: "no-close",
            resizable: false,
            draggable: false,
            modal : true,
            buttons: [
              {
                  text: "REGISTER FOR FULL VERSION",
                  click: function () {
                      location.replace("../index.html");
                  },
                   "Cancel": function () { $("#fullversion").dialog("close"); }
              }
            ]
        });
    }

    function exitPageWithoutSaveHandler() {
        self.close();
    }

    function deleteAllWidgetHandler() {
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                $(".dashBoardWidget").remove();
            }
        }
    }

    function cancelCoverHandler() {
        $(".addWidgetCover").hide();
    }

    function showAddWidgetTab() {
        $(".addWidgetCover").show();
    }

    function openProfilePageHandler() {
        var selfUser = getUrlParameterJquery('username');
        var selfProfileLink = "selfProfile.html?username=" + selfUser;
        window.open(selfProfileLink);
    }

    function addMaps() {
        //console.log("Click Clone Maps");
        if ($(".hiddenMaps").hasClass("hideMode")) {
            $(".hiddenMaps").draggable({ cancel: ".nodrag" });
            $(".hiddenMaps").show();
            $(".hiddenMaps").removeClass("hideMode");
            $(".hiddenMaps").css({ position: "absolute", top: 100, left: 100 });
        }
        $(".addWidgetCover").hide();
       
        
    }

    function addFriendFinder() {
        //console.log("Click Clone Friend Finder");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardFriendFinder'))) {
                    //console.log("A FF is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh FF");
                }
            }
        }
        var cloneFrom = $('.cloneFriendFinder').clone();
        cloneFrom.removeClass('cloneFriendFinder');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addTtsHandler() {
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardTTS'))) {
                    //console.log("A TTS is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh TTS");
                }
            }
        }
        var cloneFrom = $('.cloneTTS').clone();
        cloneFrom.removeClass('cloneTTS');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addClock() {
        //console.log("Click Clone Clock");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardClock'))) {
                    //console.log("A cal is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh calc");
                }
            }
        }
        var cloneFrom = $('.cloneClock').clone();
        cloneFrom.removeClass('cloneClock');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100 });
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addImageWidgetHandler() {
        var cloneFrom = $('.cloneImage').clone();
        cloneFrom.removeClass('cloneImage');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable().resizable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addYouTubeHandler() {
        var cloneFrom = $('.cloneYoutube').clone();
        cloneFrom.removeClass('cloneYoutube');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable().resizable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100 });
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addCalendar() {
        //console.log("Click Clone Calendar");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardCalendar'))) {
                    //console.log("A cal is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh calc");
                }
            }
        }
        var cloneFrom = $('.cloneCalendar').clone();
        cloneFrom.removeClass('cloneCalendar');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
        //ready();
    }

    function addMesseneger() {
        //console.log("Click Clone Messeneger");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardMessenger'))) {
                    //console.log("A meseneger is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh messeneger");
                }
            }
        }
        var cloneFrom = $('.cloneMessenger').clone();
        cloneFrom.removeClass('cloneMessenger');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
        //ready();
    }

    function addEventManager() {
        //console.log("Click Clone Events");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardEvents'))) {
                    //console.log("A events is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh events");
                }
            }
        }
        var cloneFrom = $('.cloneEvents').clone();
        cloneFrom.removeClass('cloneEvents');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".eventDate").datepicker();
        $(".addWidgetCover").hide();
        //ready();
    }

    function addWeather() {
        //console.log("Click Clone Weather");
        var cloneFrom1 = $('.cloneWeather').clone();
        cloneFrom1.removeClass('cloneWeather');
        cloneFrom1.removeClass('cloneWidget');
        cloneFrom1.addClass('fresh');
        cloneFrom1.show();
        cloneFrom1.draggable();
        var dom = $(cloneFrom1)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
        $(".wind").click(flipWeatherWidget);
        $(".set").click(setWeatherWidget);
    }

    function addSticky() {
        //console.log("Click Clone Sticky");
        var cloneFrom1 = $('.cloneSticky').clone();
        cloneFrom1.removeClass('cloneSticky');
        cloneFrom1.removeClass('cloneWidget');
        cloneFrom1.addClass('fresh');
        cloneFrom1.show();
        cloneFrom1.draggable();
        var dom = $(cloneFrom1)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
    }

    function addCalculator() {
        //console.log("Click Clone Calc");
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++){
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardCalculator'))) {
                    //console.log("A cal is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh calc");
                }
            }
        }
        var cloneFrom1 = $('.cloneCalculator').clone();
        cloneFrom1.removeClass('cloneCalculator');
        cloneFrom1.removeClass('cloneWidget');
        cloneFrom1.addClass('fresh');
        cloneFrom1.show();
        cloneFrom1.draggable();
        var dom = $(cloneFrom1)
            .css({ position: "absolute", top: 100, left: 100});
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
        
    }

    function addGoogler() {
        var widgets = $(".dashBoardWidget");
        for (var i = 0 ; i < widgets.length ; i++) {
            if (!($(widgets[i]).hasClass('cloneWidget'))) {
                if (($(widgets[i]).hasClass('dashBoardGoogler'))) {
                    //console.log("A cal is there");
                    $(".addWidgetCover").hide();
                    return;
                } else {
                    //console.log("a fresh calc");
                }
            }
        }
        //console.log("Click Clone Googler");
        var cloneFrom = $('.cloneGoogler').clone();
        cloneFrom.removeClass('cloneGoogler');
        cloneFrom.removeClass('cloneWidget');
        cloneFrom.addClass('fresh');
        cloneFrom.show();
        cloneFrom.draggable();
        var dom = $(cloneFrom)
            .css({ position: "absolute", top: 100, left: 100 });
        $('#launchpad').append(dom);
        $(".addWidgetCover").hide();
        //ready();
    }

    function deleteWidgetHandler() {

        if ($('.dashBoardWidget').hasClass('fresh')) {
            if (!($('.dashBoardWidget').hasClass('deleteMode'))) {
            //console.log("add")
            $('.dashBoardWidget').addClass('deleteMode');
            $('.dashBoardWidget').addClass('buzz');
            $('.deleteIcon').show();
            $('.deleteWidget').attr('src', "../images/toolBarIcon/tick.png");
            $('.deleteWidget').attr('title', "Set Widgets");
        } else {
            //console.log("Remove");
            $('.dashBoardWidget').removeClass('deleteMode');
            $('.dashBoardWidget').removeClass('buzz');
            $('.deleteIcon').hide();
            $('.deleteWidget').attr('src', "../images/toolBarIcon/delete.png");
            $('.deleteWidget').attr('title', "Delete Widgets");
            
        }
        }
    }

    function getUrlParameterJquery(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    function saveWidgetHAndler() {
        //console.log("save widget handler");
        var widgetArray = [];
        var widgets = $(".dashBoardWidget");

        if (widgets.length == 0)
            return;

        //console.log("Number on widgets on page : " + widgets.length);

        var weatherWidget = $('.dashBoardWeather');
        var stickyNoteWidget = $('.dashBoardSticky');
        var googlerWidget = $('.dashBoardGoogler');
        var calendar = $('.dashBoardCalendar');
        var clock = $('.dashBoardClock');
        var calculator = $('.dashBoardCalculator');
        widgets.each(function (index, widget) {
            var obj = null;
            widget = $(widget);
            if ((widget.hasClass('dashBoardGoogler')) && (!(widget.hasClass('cloneWidget')))) {
                //console.log("Parse Googler");
                var position = widget.position();
                var top = position.top;
                var left = position.left;
                var width = widget.outerWidth();
                var height = widget.outerHeight();
                var type = "GOOGLER";
                var atr1 = null;
                var atr2 = null;
                // //console.log("Height : " + top);
                obj = {
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    type: type,
                    atr1: atr1,
                    atr2: atr2
                }

            } else if (widget.hasClass('dashBoardWeather') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("Weather Widget parse");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "WEATHER";
                    var atr1 = (widget).find('.zipCode').val();
                    var atr2 = (widget).find('.country').val();
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type,
                        atr1: atr1,
                        atr2: atr2
                    }
                    //console.log("The two values : " + atr1 + " and " + atr2);
                } else if (widget.hasClass('dashBoardClock') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("Clock widget parse");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "CLOCK";
                    var atr1 = (widget).find('.timeCountry').val();
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type,
                        atr1: atr1
                    }
                    //console.log("Clock two values : " + atr1 + " and " + atr2);
                } else if (widget.hasClass('dashBoardSticky') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("Sticky widget parse");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "STICKY";
                    var atr1 = (widget).find('.stickyTitle').html();
                    var atr2 = (widget).find('.stickyContent').html();
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type,
                        atr1: atr1,
                        atr2: atr2
                    }
                    //console.log("Sticky two values : " + atr1 + " and " + atr2);

                }
                else if (widget.hasClass('dashBoardFriendFinder') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("Parse a friend finder");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "FRIENDFINDER";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardEvents') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("parse events");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "EVENTS";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardCalendar') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("parse calendar");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "CALENDAR";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardCalculator') && (!(widget.hasClass('cloneWidget')))) {
                    //console.log("parase calc");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "CALCULATOR";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardMaps') && (!(widget.hasClass('hideMode')))) {
                    //console.log("Parse a map");
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "MAPS";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardYoutube') && (!(widget.hasClass('cloneWidget')))) {
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "YOUTUBE";
                    var urlInWidget = widget.find('.youtubeVideo').attr('src');
                    //console.log(urlInWidget);
                    var splitUrl = urlInWidget.split("/");
                    var atr1 = splitUrl[splitUrl.length - 1];
                    //console.log("Atr1 of youtube : " + atr1);
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type,
                        atr1: atr1
                    }
                } else if (widget.hasClass('dashBoardMessenger') && (!(widget.hasClass('cloneWidget')))) {
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "MESSENGER";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardFriendFinder') && (!(widget.hasClass('cloneWidget')))) {
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "FRIENDFINDER";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardTTS') && (!(widget.hasClass('cloneWidget')))) {
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "TTS";
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type
                    }
                } else if (widget.hasClass('dashBoardImage') && (!(widget.hasClass('cloneWidget')))) {
                    var position = widget.position();
                    var top = position.top;
                    var left = position.left;
                    var width = widget.outerWidth();
                    var height = widget.outerHeight();
                    var type = "IMAGE";
                    var urlForImage = (widget).find('.urlsImage').attr('src');
                    //console.log("URL : " + urlForImage);
                    var urlForImageParsed = urlForImage.replace(new RegExp('/', "g"), '~');
                    //console.log("IMG Url to store : " + urlForImageParsed);
                    var atr1 = urlForImageParsed;
                    obj = {
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        type: type,
                        atr1: atr1
                    }
                } 
            
            if (obj != null) {
                widgetArray.push(obj);
            } 

        })
        //console.log("Widget Array LENGTH : " + widgetArray.length);
        var jsonWidgets = JSON.stringify(widgetArray);
        //console.log("JSON OBJECT FOR WIDGETS : " + jsonWidgets);
        var currentBackgroundPath = $('body').css('background-image');
        //console.log("Background path : " + currentBackgroundPath);
        var currentBackGround = currentBackgroundPath.split('/');
        var currentBackGroundExact = currentBackGround[5].split(')');
        var currentPosition = $("input[name=position]:checked").val();
        var username = getUrlParameterJquery('username');
        var sendObj = {
            widgets: widgetArray,
            dashBoardBackGround: currentBackGroundExact[0],
            toolBarPosition: currentPosition,
            dashBoardUser : username
        }

        var sendObjJson = JSON.stringify(sendObj);

        // WEBSERVICE CALL
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/dashboardSave/" + sendObjJson + "/" + username,
            success: function (data) {
                //console.log(data);
                
            }
        });

    }

    function flipWeatherWidget() {
        $(this).parent().parent().parent().parent().find('.card').addClass('flipped')
        return false;
    }

    function setWeatherWidget() {
        if ($('.flip').find('.card').hasClass('flipped')) {
            $('.flip').find('.card').removeClass('flipped');
            return false;
        }
        return false;
    }

    function removeDeleteFromClone() {
        if ($('.dashBoardWidget').hasClass('cloneWidget')) {
            $('.dashBoardWidget').removeClass('deleteMode');
            $('.dashBoardWidget').removeClass('buzz');
        }
    }

    function loadWidgetHandler() {
        //console.log("Temp Function");
        var username = getUrlParameterJquery('username');
        //WEB SERVICE CALL 
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/dashboardGet/" + username,
            success: function (data) {
                displayWidgets(data);

            }
        });
    }

    function displayWidgets(data) {
        //console.log("display Widgets");
        //console.log(data);
        var bodybackground = data.dashBoardBackGround;
        //console.log("Body background : " + bodybackground);
        var widgetsrecieved = data.widgets;
        //console.log("Widgets Recieved : " + widgetsrecieved);
        var toolBarPositionRecieved = data.toolBarPosition;
        //console.log("ToolBar Position Recieved : " + toolBarPositionRecieved);


        var $radios = $('input:radio[name=position]');
        if (toolBarPositionRecieved === "bottom") {
            //console.log("Place tool bar on bottom");
            $radios.filter('[value=bottom]').prop('checked', true);
        } else if (toolBarPositionRecieved === "top") {
            //console.log("Place tool bar on top");
            $radios.filter('[value=top]').prop('checked', true);
        } else if (toolBarPositionRecieved === "left") {
            //console.log("Place tool bar on left");
            $radios.filter('[value=left]').prop('checked', true);
        } else if (toolBarPositionRecieved === "right") {
            //console.log("Place tool bar on right");
            $radios.filter('[value=right]').prop('checked', true);
        }

        toolBarPosition();
        //console.log("BackGround Value is : " + bodybackground);
        if (data == null) {
            //console.log("in if bck")
            var backgroundImageToSet = "../images/backgrounds/default.jpg";
            
        } else {
            //console.log("In else bck");
            var backgroundImageToSet = "../images/backgrounds/" + bodybackground;
        }

        $('body').css({ backgroundImage: "url(" + backgroundImageToSet + ")" });

        for (var i = 0 ; i < widgetsrecieved.length; i++) {
            ////console.log(widgetsrecieved[i].type);
            if (widgetsrecieved[i].type == "STICKY") {
                //console.log("recieved sticky");
                var createWidget = $('.cloneSticky').clone();
                //console.log(createWidget);
                createWidget.removeClass('cloneSticky');
                createWidget.removeClass('cloneWidget');
                createWidget.addClass('fresh');
                createWidget.draggable();
                createWidget.css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                createWidget.find('.stickyContent').html(widgetsrecieved[i].atr2);
                createWidget.find('.stickyTitle').html(widgetsrecieved[i].atr1);
                createWidget.show();
                $('#launchpad').append(createWidget);
            } else if (widgetsrecieved[i].type == "GOOGLER") {
                //console.log("recieved googler");
                var createWidget = $('.cloneGoogler').clone();
                //console.log(createWidget);
                createWidget.removeClass('cloneGoogler');
                createWidget.removeClass('cloneWidget');
                createWidget.addClass('fresh');
                createWidget.draggable();
                createWidget.css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                createWidget.show();
                $('#launchpad').append(createWidget);
            } else if  (widgetsrecieved[i].type == "MESSENGER") {
                //console.log("recieved messenger");
                var cloneFrom = $('.cloneMessenger').clone();
                cloneFrom.removeClass('cloneMesseneger');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                location.href = "#";
            } else if (widgetsrecieved[i].type == "CALCULATOR") {
                //console.log("Recieved Calc");
                var cloneFrom1 = $('.cloneCalculator').clone();
                cloneFrom1.removeClass('cloneCalculator');
                cloneFrom1.removeClass('cloneWidget');
                cloneFrom1.addClass('fresh');
                cloneFrom1.show();
                cloneFrom1.draggable();
                var dom = $(cloneFrom1)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                location.href = "#";
            } else if (widgetsrecieved[i].type == "CALENDAR") {
                //console.log("recieved calendar");
                var cloneFrom = $('.cloneCalendar').clone();
                cloneFrom.removeClass('cloneCalendar');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                location.href = "#";
            } else if (widgetsrecieved[i].type == "EVENTS") {
                //console.log("recieved events");
                var cloneFrom = $('.cloneEvents').clone();
                cloneFrom.removeClass('cloneEvents');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                $(".eventDate").datepicker();
                location.href = "#";
            } else if (widgetsrecieved[i].type == "CLOCK") {
                //console.log("recieved clock");
                var createWidget = $('.cloneClock').clone();
                //console.log(createWidget);
                createWidget.removeClass('cloneClock');
                createWidget.removeClass('cloneWidget');
                createWidget.addClass('fresh');
                createWidget.draggable();
                createWidget.css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                //loadClock(widgetsrecieved[i].atr1);
                createWidget.show();
                $('#launchpad').append(createWidget);
            } else if (widgetsrecieved[i].type == "WEATHER") {
                //console.log("recieved weather");
                var cloneFrom1 = $('.cloneWeather').clone();
                cloneFrom1.removeClass('cloneWeather');
                cloneFrom1.removeClass('cloneWidget');
                cloneFrom1.addClass('fresh');
                cloneFrom1.show();
                cloneFrom1.draggable();
                var dom = $(cloneFrom1)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                getWeatherJquery(cloneFrom1, widgetsrecieved[i].atr1, widgetsrecieved[i].atr2);
                location.href = "#";
                $(".wind").click(flipWeatherWidget);
                $(".set").click(setWeatherWidget);
            }  else if (widgetsrecieved[i].type == "MAPS") {
                //console.log("recieved maps");
                $(".hiddenMaps").draggable({ cancel: ".nodrag" });
                $(".hiddenMaps").show();
                $(".hiddenMaps").removeClass("hideMode");
                $(".hiddenMaps").css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left });
                $(".addWidgetCover").hide();
                
            } else if (widgetsrecieved[i].type == "YOUTUBE") {
                //console.log("recieved youtube");
                var cloneFrom = $('.cloneYoutube').clone();
                cloneFrom.removeClass('cloneYoutube');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable().resizable();
                //console.log("Youtube atr : " + widgetsrecieved[i].atr1);
                var url = "//www.youtube.com/embed/" + widgetsrecieved[i].atr1;
                cloneFrom.find('.youtubeVideo').attr('src', url);
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width : widgetsrecieved[i].width, height : widgetsrecieved[i].height });
                $('#launchpad').append(dom);
            } else if (widgetsrecieved[i].type == "EVENTS") {
                //console.log("Recieved Events");
                var cloneFrom = $('.cloneEvents').clone();
                cloneFrom.removeClass('cloneEvents');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width : widgetsrecieved[i].width, height : widgetsrecieved[i].height });
                $('#launchpad').append(dom);
                $(".eventDate").datepicker();
            } else if (widgetsrecieved[i].type == "MESSENGER") {
                //console.log("Recieved Messenger");
                var cloneFrom = $('.cloneMessenger').clone();
                cloneFrom.removeClass('cloneMesseneger');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width : widgetsrecieved[i].width, height : widgetsrecieved[i].height });
                $('#launchpad').append(dom);
            } else if (widgetsrecieved[i].type == "FRIENDFINDER") {
                var cloneFrom = $('.cloneFriendFinder').clone();
                cloneFrom.removeClass('cloneFriendFinder');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width : widgetsrecieved[i].width, height : widgetsrecieved[i].height });
                $('#launchpad').append(dom);
            } else if (widgetsrecieved[i].type == "TTS") {
                var cloneFrom = $('.cloneTTS').clone();
                cloneFrom.removeClass('cloneTTS');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable();
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width: widgetsrecieved[i].width, height: widgetsrecieved[i].height });
                $('#launchpad').append(dom);
            } else if (widgetsrecieved[i].type == "IMAGE") {
                var cloneFrom = $('.cloneImage').clone();
                cloneFrom.removeClass('cloneImage');
                cloneFrom.removeClass('cloneWidget');
                cloneFrom.addClass('fresh');
                cloneFrom.show();
                cloneFrom.draggable().resizable();
                //console.log("ATR1 recieved : " + widgetsrecieved[i].atr1)
                var url = widgetsrecieved[i].atr1.replace(new RegExp('~', "g"), '/');
                //console.log("Image to load : " + url);
                cloneFrom.children().find('.urlsImage').attr('src', url);
                cloneFrom.children().find('.imageLink').val(url);
                if (url == null || url == "") {
                    cloneFrom.find('.imageEdit').show();
                    cloneFrom.find('.imageContent').hide();
                } else {
                    cloneFrom.find('.imageEdit').hide();
                    cloneFrom.find('.imageContent').show();
                }
                var dom = $(cloneFrom)
                    .css({ position: "absolute", top: widgetsrecieved[i].top, left: widgetsrecieved[i].left, width : widgetsrecieved[i].width , height : widgetsrecieved[i].height });
                $('#launchpad').append(dom);
            }
        }

    }


    function getEventHandlerJquery() {
        var username = getUrlParameter('username');
        if (username != null || username != "") {
            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/geteventlist/" + username,
                success: function (data) {
                    //console.log(data);

                    for (var i = 0 ; i < data.length; i++) {
                        var eventsname = data[i].eventName;
                        var eventsTime = data[i].eventDate;
                        ////console.log("Event number " + (i + 1) + " " + eventsname + " at " + eventsTime);
                        var dataFormatString = eventsTime.split('-');
                        var DateCompareString = dataFormatString[0] + "/" + dataFormatString[1] + "/" + dataFormatString[2];
                        var eventdateIndateFormat = new Date(DateCompareString);
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1;
                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd
                        }
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        today = mm + '/' + dd + '/' + yyyy;
                        var todayDate = new Date(today);
                        if (todayDate <= eventdateIndateFormat) {
                            var tableRow = "<tr><td>" + eventsname + "</td>" + "<td>" + eventsTime + "</td>" + "</tr>";
                            $(".eventListTable > tbody").append(tableRow);
                        }

                    }

                }
            });
        }
    }


    function getAllUsers() {
        var username = getUrlParameter('username');
        $(".friendListTable > tbody").empty();
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getallusernames/" + username,
            success: function (data) {
                //console.log(data);
                //console.log(data.allOtherUserList);
                for (var i = 0 ; i < data.allOtherUserList.length; i++) {
                    //console.log(data.allOtherUserList[i]);
                    $(".friendListTable > tbody").append('<tr><td><a class="otheruser" target="_blank" href="otherProfile.html?user=' + username + '&profileUser=' + data.allOtherUserList[i] + '">' + data.allOtherUserList[i] + '<img class="moreicon" src="../images/more.png" /></a></td></tr>')
                }
            }
        });
        }

    function settingDivHandler() {
        if ($(".settings").hasClass('visible')) {
            $(".settings").removeClass('visible');
            $(".settings").slideUp();
        } else {
            $(".settings").addClass('visible');
            $(".settings").slideDown();
        }
    }

    function toolBarPosition() {
        //console.log("change in tool bar position");
        var currentPosition = $("input[name=position]:checked").val();
        //console.log("Position of Tool BAR : " + currentPosition);
        if (currentPosition == "bottom") {
            $(".toolbarBottom").show();
            $(".toolbarTop").hide();
            $(".toolbarLeft").hide();
            $(".toolbarRight").hide();
        } else if(currentPosition == "top") {
            $(".toolbarBottom").hide();
            $(".toolbarTop").show();
            $(".toolbarLeft").hide();
            $(".toolbarRight").hide();
        } else if (currentPosition == "left") {
            $(".toolbarBottom").hide();
            $(".toolbarTop").hide();
            $(".toolbarLeft").show();
            $(".toolbarRight").hide();
        } else if (currentPosition == "right") {
            $(".toolbarBottom").hide();
            $(".toolbarTop").hide();
            $(".toolbarLeft").hide();
            $(".toolbarRight").show();
        }
    }

    function getWeatherJquery(obj, atr1, atr2) {
        //console.log("Attributes : " + atr1 + " & " + atr2);
        //var divEdit = $(obj).parent().parent();
        ////console.log("here here");
        //var zip = (divEdit).find('.zipCode').val();
        ////console.log("zip : " + zip);
        //var placeSelected = (divEdit).find('select.country option:selected').val();
        var placeSelectedForUrl = atr2.replace(new RegExp(" ", "g"), '&');
        //console.log("country" + placeSelectedForUrl);
        var str = "q=ZIP,COUNTRY&format=json&num_of_days=1&key=7fb14336cc58cb24c49b88edd85a9050953334c9";
        var url = str.replace("ZIP", atr1);
        url = url.replace("COUNTRY", placeSelectedForUrl);
        //console.log("The URL : " + url);
        $.ajax({
            type: "GET",
            url: "http://api.worldweatheronline.com/free/v1/weather.ashx?",
            data: url,
            success: function (data) {
                //var divEdit = $(obj).parent().parent();
                var date = data.data.weather[0].date;
                var maxTemp = data.data.weather[0].tempMaxF;
                var minTemp = data.data.weather[0].tempMinF;
                var wind = data.data.weather[0].windspeedMiles;
                var image = data.data.weather[0].weatherIconUrl[0].value;
                //console.log("max temp : " + maxTemp);
                (obj).find('.address').html(atr1 + " - " + atr2);
                (obj).find('.degree').html("Min Temp : " + minTemp + "<br>" + "Max Temp : " + maxTemp + "<br>Wind : " + wind + " mph");
                (obj).find('.addressDate').html(date);
                (obj).find('.weatherImg').attr('src', image);
            },
            error: function () {
                alert("Opps !! Something went wrong");
            }
        });
    }

});

function deleteWidgetAction(obj) {
    if ($(obj).hasClass('deleteCalendar')) {
        //console.log("remove calendar");
        $(obj).parent().remove();
    } else if ($(obj).hasClass('deleteGoogler')) {
        $(obj).parent().remove();
        //console.log("remove Googler");
    } else if ($(obj).hasClass('deleteWeather')) {
        $(obj).parent().parent().parent().parent().remove();
        //console.log("remove weather");
    } else if ($(obj).hasClass('deleteClock')) {
        $(obj).parent().remove();
        //console.log("remove clock");
    } else if ($(obj).hasClass('deleteSticky')) {
        $(obj).parent().parent().remove();
        //console.log("remove sticky");
    } else if ($(obj).hasClass('deleteCalculator')) {
        $(obj).parent().parent().parent().remove();
        //console.log("remove calc");
    } else if ($(obj).hasClass('deleteEvents')) {
        $(obj).parent().parent().remove();
        //console.log("remove Events");
    } else if ($(obj).hasClass('deleteMessenger')) {
        $(obj).parent().remove();
        //console.log("remove Messenger");
    } else if ($(obj).hasClass('deleteFriendFinder')) {
        $(obj).parent().remove();
        //console.log("remove FF");
    } else if ($(obj).hasClass('deleteMaps')) {
        $(".hiddenMaps").addClass('hideMode');
        $(".hiddenMaps").hide();
        //console.log("remove Maps");
    } else if ($(obj).hasClass('deleteTTS')) {
        $(obj).parent().remove();
        //console.log("remove TTS");
    } else if ($(obj).hasClass('deleteImage')) {
        $(obj).parent().remove();
        //console.log("remove Image");
    } else if ($(obj).hasClass('deleteYoutube')) {
        $(obj).parent().remove();
        //console.log("remove Youtube");
    }
}

function limitStickyTitle(obj) {
    //console.log("Here Check");
}



function clearStickyContent(obj) {
    if ($(obj).html() == "Content")
        $(obj).html('');
}

function clearStickyTitle(obj) {
    if ($(obj).html() == "Title")
        $(obj).html('');
}

function limitStickyContent(obj) {

}

function editLength(obj) {
    var currentstring = $(obj).html();
    //console.log(currentstring);
}

function performNumberKeyAction(val, obj) {
    //console.log(val);
    var cVal = $('.display').val();
    var cValChange = cVal + val;
    $('.display').val(cValChange);
}

function performCalculations() {
    var evalVal = $('.display').val();
    var result = eval(evalVal);
    //console.log(result);
    $('.display').val("");
    $('.display').val(result);
}

function loadClock(c) {
    var flashMap = new SWFObject("http://24timezones.com/timescript/clock_final.swf", "main", "175", "175", "7.0.22", "#FFFFFF", true)
    flashMap.addParam("movie", "http://24timezones.com/timescript/clock_final.swf");
    flashMap.addParam("quality", "high");
    flashMap.addParam("wmode", "transparent");
    flashMap.addParam("flashvars", "color=006600&logo=1&city=" + c);
    flashMap.write("flash_container_tt5463e68d2dc13");
}

function clockReload(obj) {
    var placeSelected = $(obj).val();
    //console.log(placeSelected);
    loadClock(placeSelected);
}



function getWeather(obj) {
    var divEdit = $(obj).parent().parent();
    //console.log("here here");
    var zip = (divEdit).find('.zipCode').val();
    //console.log("zip : " + zip);
    var placeSelected = (divEdit).find('select.country option:selected').val();
    var placeSelectedForUrl = placeSelected.replace(new RegExp(" ", "g"), '&');
    //console.log("country" + placeSelectedForUrl);
    var str = "q=ZIP,COUNTRY&format=json&num_of_days=1&key=7fb14336cc58cb24c49b88edd85a9050953334c9";
    var url = str.replace("ZIP", zip);
    url = url.replace("COUNTRY", placeSelectedForUrl);
    //console.log("The URL : " + url);
    $.ajax({
        type: "GET",
        url: "http://api.worldweatheronline.com/free/v1/weather.ashx?",
        data: url,
        success: function (data) {
            var divEdit = $(obj).parent().parent();
            var date = data.data.weather[0].date;
            var maxTemp = data.data.weather[0].tempMaxF;
            var minTemp = data.data.weather[0].tempMinF;
            var wind = data.data.weather[0].windspeedMiles;
            var image = data.data.weather[0].weatherIconUrl[0].value;
            (divEdit).find('.address').html((divEdit).find('.zipCode').val() + " - " + (divEdit).find('select.country option:selected').val());
            (divEdit).find('.degree').html("Min Temp : " + minTemp + "<br>" + "Max Temp : " + maxTemp + "<br>Wind : " + wind + " mph");
            (divEdit).find('.addressDate').html(date);
            (divEdit).find('.weatherImg').attr('src', image);
        },
        error: function () {
            alert("Opps !! Something went wrong");
        }
    });
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


function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}



function addEventHandler() {
    //console.log("Call");
    var username = getUrlParameter('username');
    //console.log("Username from URl is : " + username);
    var eventDate = $(".eventDate").val();
    var eventName = $(".eventName").val();
    //console.log("Event details : " + eventName + " on " + eventDate);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    var eventsDate = new Date(eventDate);
    var todaysDate = new Date(today);
    var errorMessage = "";

    if (todaysDate <= eventsDate) {
        if (!((eventName == "") || (eventName == ""))) {

            var splitDate = eventDate.split('/');
            ////console.log(splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2]);
            var dateString = splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2];
            ////console.log("data string : " + dateString);

            $.ajax({
                dataType: "json",
                url: "http://project-cs5610fall14.rhcloud.com/eventStore/" + dateString + "/" + eventName + "/" + username,
                success: function (data) {
                    ////console.log(data);
                    if (data.message == "success") {
                        //console.log("Event Created");
                        getEventHandler();
                    } 
                }
            });

        } else {
            errorMessage = "Event name can't be left blank";
        }
    }
    else
    {
        if (errorMessage != "") {
            alert(errorMessage);
            return;
        }
        alert("Cannot create event for past date");
        return;
    }

    
}


function getEventHandler() {
    var username = getUrlParameter('username');
    if (username != null || username != "") {
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/geteventlist/" + username,
            success: function (data) {
                //console.log(data);
                //console.log(data[0]);
                if (data[0] != null) {

                    $(".eventListTable > tbody").empty();
                    for (var i = 0 ; i < data.length; i++) {
                        var eventsname = data[i].eventName;
                        var eventsTime = data[i].eventDate;
                        ////console.log("Event number " + (i + 1) + " " + eventsname + " at " + eventsTime);
                        var dataFormatString = eventsTime.split('-');
                        var DateCompareString = dataFormatString[0] + "/" + dataFormatString[1] + "/" + dataFormatString[2];
                        var eventdateIndateFormat = new Date(DateCompareString);
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1;
                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd
                        }
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        today = mm + '/' + dd + '/' + yyyy;
                        var todayDate = new Date(today);
                        if (todayDate <= eventdateIndateFormat) {
                            var tableRow = "<tr><td>" + eventsname + "</td>" + "<td>" + eventsTime + "</td>" + "</tr>";
                            $(".eventListTable > tbody").append(tableRow);
                        }

                    }
                } else {
                    $(".eventListTable > tbody").empty();
                    $(".eventListTable > tbody").append('<tr>No Upcoming Events</tr>')
                }
           
            }
        });
    }
}

function getAllMessages() {
    var username = getUrlParameter('username');
    if((username != "")||(username == null)){
        $.ajax({
            dataType: "json",
            url: "http://project-cs5610fall14.rhcloud.com/getofflinemessages/" + username,
            success: function (data) {
                ////console.log(data);
                if (data != null) {
                    ////console.log("In if");
                    $(".messageListTable > tbody").empty();
                    for (var i = 0 ; i < data.length; i++) {
                        //var tableRow = "<tr><td>" + data[i].fromusername + "</td>" + "<td>" + data[i].messageContent + "</td>" + "</tr>";
                        var tableRow = '<tr class="cloneSingleMessage"><td><label class="toUser">' + data[i].fromusername + '</label> : <labe/>' + data[i].messageContent + '</label><img title="Reply" onclick="replyOption(this);" class="moreicon reply" src="../images/reply.png" /><img title="Send" onclick="sendReply(this);" class="moreicon send" src="../images/send.png" /><img title="Message Sent" class="moreicon sent" src="../images/sent.png" /><img title="Cancel" onclick="noSendReply(this);" class="moreicon noSend" src="../images/cross.png" /><br /><input type="text" placeholder="Reply..." class="replyContent form-control" /></td></tr>';
                    
                        $(".messageListTable > tbody").append(tableRow);
                        $(".send").hide();
                        $(".noSend").hide();
                        $(".sent").hide();
                        $(".replyContent").hide();
                        
                    }
                } else {
                    ////console.log("in else");
                    $(".messageListTable > tbody").empty();
                    $(".messageListTable > tbody").append('<tr>No Oflline Messages</tr>')
                }
                
               
            }
        });
    }
}




function changeBackground(obj) {
    var background = $(obj).attr('src');
    $('body').css({ backgroundImage: "url(" + background + ")" });
}

function executeTTSHandler() {
    var textVal = $(".textToSpeech").val();
    //console.log(textVal);
    var textValToConvert = textVal.replace(new RegExp(" ", "g"), "%20");
    var query = "http://tts-api.com/tts.mp3?q=" + textValToConvert;
    $(".playSpeech").attr('src', query);
}

function googleText(obj) {
    var textToGoogle = $(obj).parent().find('.textToGoogle').val();
    //console.log("Google : " + textToGoogle);
    var queryText = textToGoogle.replace(new RegExp(" ", "g"), "+");
    var linkToOpen = "https://www.google.com/#q=" + queryText;
    window.open(linkToOpen);

}


function sendReply(obj) {
    var messageRowToChange = $(obj).parent();
    var username = getUrlParameter('username');
    var msgDetails = messageRowToChange.find('.toUser').html();
    ////console.log("Send Message to : " + msgDetails);
    var replyContent = messageRowToChange.find('.replyContent').val();
    
    $.ajax({
        dataType: "json",
        url: "http://project-cs5610fall14.rhcloud.com/sendofflinemsg/" + username + "/" + msgDetails + "/" + replyContent,
        success: function (data) {
            if (data.message == "success") {
                messageRowToChange.find('.send').hide();
                messageRowToChange.find('.noSend').hide();
                messageRowToChange.find('.replyContent').hide();
                messageRowToChange.find('.sent').show();
            }
        }
    });
}

function noSendReply(obj) {
    var messageRowToChange = $(obj).parent();
    messageRowToChange.find('.send').hide();
    messageRowToChange.find('.noSend').hide();
    messageRowToChange.find('.replyContent').hide();
    messageRowToChange.find('.reply').show();
}

function replyOption(obj) {
    var messageRowToChange = $(obj).parent();
    messageRowToChange.find('.send').show();
    messageRowToChange.find('.noSend').show();
    messageRowToChange.find('.replyContent').show();
    messageRowToChange.find('.reply').hide();
}

function filterUser(obj) {
    //console.log("called");
    var users = $(".otheruser");
    for (var i = 0 ; i < users.length ; i++) {
        //console.log($(users[i]).text());
        if (checkSubstring($(users[i]).text(), $(obj).val()) > -1) {
            $(users[i]).parent().parent().show();
        } else {
            $(users[i]).parent().parent().hide();
        }
    }
}


function checkSubstring(str1,str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    var n = str1.indexOf(str2);
    //console.log("pair " + str1 + " @ " + str2 + " gives " + n);
    return n;
}


function filterMessages(obj){
    var messages = $(".toUser");
    for (var i = 0 ; i < messages.length ; i++) {
        //console.log($(messages[i]).text());
        if (checkSubstring($(messages[i]).text(), $(obj).val()) > -1) {
            $(messages[i]).parent().parent().show();
        } else {
            $(messages[i]).parent().parent().hide();
        }
    }
}

function checkLength(obj) {
    //console.log("Called on key up");
    var valueToCheck = $(obj).html();
    //console.log(valueToCheck);
    if (valueToCheck.length > 10) {
        var valueCut = valueToCheck.substring(0, 10);
        //console.log("Value cut : " + valueCut);
        $(obj).html(valueCut)
    } else {
        $(obj).html(valueToCheck);
    }
}
