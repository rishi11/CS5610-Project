function handleCalenderSize(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
    obj.parentElement.style.width = obj.contentWindow.document.body.scrollWidth + 20 + 'px';
}