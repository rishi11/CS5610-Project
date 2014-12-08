

function setImageHandler(obj) {
    ////console.log("Change Here");
    var imageWidgetToChange = $(obj).parent().parent();
    var imageURL = imageWidgetToChange.children().find('.imageLink').val();
    //console.log("Image value : " + imageURL);
    if (imageURL == null || imageURL == "") {
        
    }
    else if (imageURL != null || imageURL != "") {
        imageWidgetToChange.find('.urlsImage').attr('src', imageURL);
        imageWidgetToChange.children().find('.imageLink').val('');
        imageWidgetToChange.find('.imageContent').show();
        imageWidgetToChange.find('.imageEdit').hide();
    }
    
}


function showEditImage(obj) {
    //console.log("Edit Image");
    var imageWidgetToChange = $(obj).parent().parent();
    imageWidgetToChange.find('.imageContent').hide();
    var currentURL = imageWidgetToChange.find('.urlsImage').attr('src');
    imageWidgetToChange.find('.imageLink').val(currentURL); 
    imageWidgetToChange.find('.imageEdit').show();
}
