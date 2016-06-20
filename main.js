var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Language Votes
languages = {
  javascript: {
    name: 'Javascript',
    votes: 0
  },
  python: {
    name: 'Python',
    votes: 0
  },
  ruby: {
    name: 'Ruby',
    votes: 0
  },
  eiffel: {
    name: 'Eiffel',
    votes: 0
  },
  ada: {
    name: 'Ada',
    votes: 0
  }
};

// Routing
app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket){
  socket.on('submit', function (data) {
    console.log('data', data);
    console.log(languages[data]);
    languages[data].votes += 1;
    io.emit('language', languages);
  });
});
