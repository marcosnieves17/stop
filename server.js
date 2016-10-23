var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var exphbs  = require('express-handlebars');

var app = express();
var server = http.Server(app);
var io = socketio(server);
var db = {};

var socketManager = require('./lib/socketManager')({ db: db, io: io });

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/:view', function(req, res) {
  return res.render(req.params.view || 'home');
});

io.on('connection', socketManager);

server.listen(3000);
