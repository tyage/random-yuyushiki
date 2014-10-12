$(function() {
  var generateImages = function() {
    return [];
  };
  var images = location.search.length > 0 ?
    location.search.slice(1).split(',') : generateImages();

  $('#images').empty();
  images.forEach(function(image) {
    $('<img>').attr('src', image).appendTo('#images');
  });
});
