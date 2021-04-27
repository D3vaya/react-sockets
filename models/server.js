const path = require("path");
const http = require("http");
const express = require("express");
const Sockets = require("./sockets");
const socketIO = require("socket.io");

class Server {
  constructor() {
    this.port = process.env.PORT || 8080;
    this.app = express();

    this.server = http.createServer(this.app);
    // TODO falta las configuraciones
    this.io = socketIO(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurationSockets() {
    new Sockets(this.io);
  }

  execute() {
    // NOTE inicializar todos los middlewares, sockets, server
    this.middlewares();
    this.configurationSockets();

    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto:", this.port);
    });
  }
}

module.exports = Server;
