$(function() {
  $.getJSON('yuyushiki/yuyushiki.json').done(function(data) {
    var generateImages = function() {
      var images = [];
      var usedData = _.filter(data, function(image) {
        return !image.useless;
      });
      for (var i = 0; i < 4; ++i) {
        var image = usedData[Math.floor(Math.random() * usedData.length)];
        images.push(_.indexOf(data, image));
      }
      return images;
    };
    var query = decodeURIComponent(location.search).substring(1);
    var params = {};
    query.split('&').forEach(function(param) {
      var p = param.split('=');
      params[p[0]] = p[1];
    });
    var images = params.images ? params.images.split(',') : generateImages();
    var base = params.base || '';

    $('#images').empty();
    _.each(images, function(image) {
      var url = base + data[image].path;
      $('<img>').attr('src', url).appendTo('#images');
    });
  });
});
