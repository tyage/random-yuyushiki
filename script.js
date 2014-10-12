$(function() {
  var images = location.hash.split('#')[1].split(',');
  $('#images').empty();
  images.forEach(function(image) {
    $('<img>').attr('src', image).appendTo('#images');
  });
});
