$(function() {
  $.getJSON('yuyushiki/yuyushiki.json').done(function(data) {
    var generateImages = function() {
      var images = [];
      for (var i = 0; i < 4; ++i) {
        images.push(Math.floor(Math.random() * data.length));
      }
      return images;
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
      var url = base + data[image].path;
      $('<img>').attr('src', url).appendTo('#images');
    });
  });
});
