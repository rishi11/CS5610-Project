var currentBackground = $('body').css('background-image');
function changeBackground(obj) {
    var background = $(obj).attr('src');
    //console.log("bck : " + background + " $$ " + currentBackground);
    $('body').css({ backgroundImage: "url(" + background + ")" });
    currentBackground = background;
}

function feelBackground(obj) {
    var background = $(obj).attr('src');
    $('body').css({ backgroundImage: "url(" + background + ")" });
}

function removeFeelBackground(obj) {
    $('body').css({ backgroundImage: "url(" + currentBackground + ")" });
}
