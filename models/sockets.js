class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvent();
  }

  socketEvent() {
    this.io.on("connection", (socket) => {
      socket.emit("mensaje-bienvenida", {
        msg: "Hola mundo",
        date: new Date(),
      });
      socket.on("msg-to-server", (data) => {
        console.log(data);
        this.io.emit("msg-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
