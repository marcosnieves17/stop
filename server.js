var express = require('express');
var exphbs  = require('express-handlebars');
var io = require('socket.io');

var app = express();
var server = require('http').Server(app);
io = io(server);

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/playground', function(req, res) {
  res.render('playground');
});

io.on('connection', function(socket) {
  console.log(io);
  socket.on('join', function(info, ack) {
    socket.join(info.room, function(err) {
      if (err) {
        console.log(err);
        ack('ERROR');
      } else {
        ack('OK');
        io.to(info.room).emit('new player', { name: info.name });

        socket.on('start', function(game_details) {
          io.to(info.room).emit('start game', { game: game_details });

          socket.on('end', function() {
            io.to(info.room).emit('send data');
          });
        });
      }
    });
  });
});

server.listen(3000);
