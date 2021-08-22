import { Server } from "socket.io";

const rooms = [];
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.emit("message", socket.id);

  socket.on("joinRoom", (msg) => {
    socket.join(msg.id);
    io.sockets.in(msg.id).emit("sendID", msg.id);

    if (rooms.findIndex((i) => i.id === msg.id) !== -1) {
      io.sockets
        .in(msg.id)
        .emit(
          "updateState",
          rooms[rooms.findIndex((i) => i.id === msg.id)].data
        );
    } else {
      rooms.push({
        id: msg.id,
        data: msg.data,
      });
    }
    console.log(rooms);
    console.log("----------------");
  });

  socket.on("updateState", (message) => {
    rooms[rooms.findIndex((i) => i.id === message.id)].data = message.data;
    console.log(rooms);
    console.log("_______________");
    io.sockets.in(message.id).emit("updateState", message.data);
  });
});
