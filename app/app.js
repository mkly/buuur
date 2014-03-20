var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    images = [];

server.listen(80);

app.use("/", express.static(__dirname + "/public"));

io.sockets.on('connection', function(socket) {
  socket.on('add buuur', function(data) {
    images.unshift(data.img);
    while (images.length > 10) {
      images.pop();
    }
    io.sockets.emit('buuur added', { img: data.img });
  });
});

app.get('/images', function(req, res) {
  res.json(images);
});
