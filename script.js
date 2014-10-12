$(function() {
  var query = decodeURIComponent(location.search).substring(1);
  var params = {};
  query.split('&').forEach(function(param) {
    var p = param.split('=');
    params[p[0]] = p[1];
  });
  var rehash = function() {
    history.pushState(null, null, '?' + $.param(params));
  };
  var setImageParam = function(index, image) {
    var images = params.images.split(',');
    images[index] = image;
    params.images = images.join(',');
  };

  $.getJSON('yuyushiki/yuyushiki.json').done(function(data) {
    var usedData = _.filter(data, function(image) {
      return !image.useless;
    });
    var randomImage = function() {
      var image = usedData[Math.floor(Math.random() * usedData.length)];
      return _.indexOf(data, image);
    };
    var generateImages = function() {
      var images = [];
      for (var i = 0; i < 4; ++i) {
        var image = randomImage();
        images.push(image);
        setImageParam(i, image);
      }
      rehash();
      return images;
    };
    var images = params.images ? params.images.split(',') : generateImages();
    var base = params.base || '';

    $('#images').empty();
    _.each(images, function(image, i) {
      var url = base + data[image].path;
      $('<img>').attr('src', url).click(function() {
        var id = randomImage();
        var url = base + data[id].path;
        $(this).attr('src', url);
        setImageParam(i, id);
      }).appendTo('#images');
    });
  });
});
