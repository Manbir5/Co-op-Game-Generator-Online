function transformButtonForRetry() {
    //Transforms button so that it can't be submitted twice and changes value of button a well.
    var button_id = document.getElementById('retryButton');
    button_id.disabled = true;
    button_id.value = "Searching ... "
    button_id.form.submit();

}
