var express = require('express');
var exphbs  = require('express-handlebars');
var io = require('socket.io');

var app = express();
io = io(app);

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('home');
});

io.on('connection', function(socket) {
  console.log(io);
  socket.on('join', function(info) {
    socket.join(info.room, function(err) {
      console.log(err);
      io.to(info.room).emit('new player', { name: info.name });

      socket.on('start', function(game_details) {
        io.to(info.room).emit('start game', { game: game_details });

        socket.on('end', function() {
          io.to(info.room).emit('send data');
        });
      });
    });
  });
});

app.listen(3000);
