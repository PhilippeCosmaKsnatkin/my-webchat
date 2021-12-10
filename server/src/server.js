import { Server } from "socket.io";
const roomlist=[];

export function launch(port) {
  const server = new Server({
    cors: {
      origin: "*",
    },
  });

  server.on("connection", (socket) => {
    console.log("new connection.", socket.id);

    socket.on("room::join", ({ room }) => {
      socket.join(room);
      if (roomlist.indexOf(room) === -1) {
        roomlist.push(room);
        socket.emit("listRoom::", roomlist);
      }
    });

    

    socket.on("getListRoom", () => {
      socket.emit("listRoom::", roomlist);
      console.log(roomlist);
    
    });

    socket.on("room::message::send", ({ room, message }) => {
      server.in(room).emit("room::message::send", { room, message });
    
    });
  })

  server.listen(port);
  console.log(`server started at localhost:${port}`);
}