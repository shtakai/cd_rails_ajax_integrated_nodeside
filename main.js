var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.post('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('post');
  console.log(req.body);
  name = req.body.name;
  console.log(languages[name]);
  console.log(name)
  if( languages[name] != undefined ){
    languages[name].votes += 1;
  }
  io.sockets.emit('hi');
  res.json(languages);
});

io.on('connection', function(socket){
  socket.on('submit', function (data) {
    console.log('data', data);
    console.log(languages[data]);
    languages[data].votes += 1;
  });
});
