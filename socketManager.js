module.exports = function(dependencies) {
  var db = dependencies.db;
  var io = dependencies.io;

  return function mainHandler(socket) {
    socket.on('join', function(info, ack) {
      if (io.sockets.adapter.rooms[info.room] && io.sockets.adapter.rooms[info.room]['in-game']) {
        return ack('IN GAME ALREADY');
      }

      socket.join(info.room, function(err) {
        if (err) {
          console.log(err);
          return ack('ERROR');
        }

        ack('OK');

        socket.to(info.room).emit('new player', { name: info.name });

        socket.on('disconnect', function() {
          socket.to(info.room).emit('player left', { name: info.name });
        });

        socket.on('start', function(game_details) {
          io.sockets.adapter.rooms[info.room]['in-game'] = true;
          io.to(info.room).emit('start game', { game: game_details });

          socket.on('end', function() {
            io.to(info.room).emit('send data');

            socket.on('submission', function(data, fn) {
              if (!(info.room in db)) {
                db[info.room] = [];
              }

              db[info.room].push(data);
              if (db[info.room].length >= io.sockets.adapter.rooms[info.room]) {
                // calculate score
                // emit winners to all
                console.log('finished');
                delete db[info.room];
                delete io.sockets.adapter.rooms[info.room]['in-game'];
              }
            });
          });
        });
      });
    });
  };
};
