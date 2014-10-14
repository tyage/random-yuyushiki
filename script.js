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
    var images = params.images ? params.images.split(',') : [];
    images[index] = image;
    params.images = images.join(',');
  };

  $.getJSON('yuyushiki/yuyushiki.json').done(function(data) {
    var usedData = _.filter(data, function(image) {
      return !image.useless;
    });
    var randomImage = function() {
      var image = usedData[Math.floor(Math.random() * usedData.length)];
      return image.path;
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
    $.fn.randomize = function(time) {
      var path = randomImage();
      var url = base + path;
      var index = $(this).parent().children().index(this);
      setImageParam(index, path);

      // slot start
      var img = this;
      var i = 0;
      var images = params.images.split(',');
      time = time === undefined ? 10 : time;
      var timer = setInterval(function() {
        ++i;
        $(img).attr('src', images[i % images.length]);
        if (i > time) {
          clearInterval(timer);
          $(img).attr('src', url);
        }
      }, 50);

      return this;
    };

    $('#images').empty();
    _.each(images, function(image) {
      var url = base + image;
      $('<img>').attr('src', url).click(function() {
        $(this).randomize();
        rehash();
      }).appendTo('#images');
    });
    $('#random-images').click(function() {
      $('#images img').each(function() {
        $(this).randomize();
      });
      rehash();
      return false;
    });
  });
});
