var toggleLoadingIndicator = function (event) {
    $('#loadGif').css('opacity', event.data.hide ? '0' : '1');
};

$(document).ready(function () {
    var $body = $('body');
    $body.on('loadingStarted', {hide: false}, toggleLoadingIndicator);
    $body.on('loadingStopped', {hide: true}, toggleLoadingIndicator);
});