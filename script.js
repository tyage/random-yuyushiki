$(function() {
  var generateImages = function() {
    return [];
  };
  var query = decodeURIComponent(location.search).substring(1);
  var params = {};
  query.split('&').forEach(function(param) {
    var p = param.split('=');
    params[p[0]] = p[1];
  });
  var images = params.images.length > 0 ? params.images.split(',') : generateImages();
  var base = params.base || '';

  $('#images').empty();
  images.forEach(function(image) {
    $('<img>').attr('src', base + image).appendTo('#images');
  });
});
