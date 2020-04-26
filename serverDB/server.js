const http = require("http");
const app = require("./routes/routes");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const connections = [];
server.listen(port);
console.log("server listening on port :", port);
let player1 = false;
let player2 = false;
let idplayer1 = "";
let idplayer2 = "";

const io = require("socket.io").listen(server);

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(" %s sockets is connected", connections.length);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });
  socket.on("newplayer", (message) => {
    if (player1) {
      io.sockets.emit("newplayer", "je te repond :" + message);
    }

    console.log(" direction ", message);
  });
  socket.on("sending message", (message) => {
    io.sockets.emit("new message", { message: " ==> you said : " + message });
  });
});
