var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server),
  images = {};

server.listen(process.env.PORT || 3000);

app.use("/", express.static(__dirname + "/public"));

io.sockets.on("connection", function (socket) {
  socket.on("add buuur", function (data) {
    if (images[data.room] === undefined) {
      images[data.room] = [];
    }
    images[data.room].unshift(data.img);
    images[data.room] = images[data.room];
    io.sockets.emit("buuur added", { img: data.img, room: data.room });
  });
});

app.get("/images/:room", function (req, res) {
  const room = req.params.room.replace(/[^a-z0-9]/, "");
  if (images[room] === undefined) {
    images[room] = [];
  }
  res.json(images[room]);
});

app.get("/clear/:room", function (req, res) {
  const room = req.params.room.replace(/[^a-z0-9]/, "");
  delete images[room];
  io.sockets.emit("buuur cleared", {});
  res.json([]);
});
