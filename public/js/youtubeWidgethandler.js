
function setNewURL(obj) {
    var youTubeWidgetToChange = $(obj).parent().parent().parent().parent().parent();
    var youTubeUrlToLoad = $(obj).parent().parent().find('.youtubeUrl').val();
    //console.log("URL : " + youTubeUrlToLoad);
    var currentVideoLink = youTubeWidgetToChange.find('.youtubeVideo').attr('src');
    //console.log("Current video : " + currentVideoLink);
    var splitUrl = youTubeUrlToLoad.split("=");
    var urlAppend = splitUrl[splitUrl.length - 1];
    //console.log("Append URL : " + urlAppend);
    var finalUrl = "//www.youtube.com/embed/" + urlAppend;
    youTubeWidgetToChange.find('.youtubeVideo').attr('src', finalUrl);
}
