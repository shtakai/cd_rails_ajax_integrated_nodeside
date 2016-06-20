$(function(){
  console.log('load');

  var socket = io();
  $('button.language').click(function () {
    socket.emit('submit', $(this).attr('id'));
    return false;
  });

  socket.on('language', function (data) {
    console.log(data);
    $('.language').append(data);
  });
});
