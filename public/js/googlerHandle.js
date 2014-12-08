$('.googleBtn').click(function () {
    var searchString = $('#google').val();
    var URL = "https://www.google.com/?gws_rd=ssl#q=SEARCHSTRING";
    //console.log(searchString.length);
    if (searchString.length != 0) {
        URL = URL.replace("SEARCHSTRING", searchString);
        window.open(URL);
    } else {
        $('#google').focus();
    }
});