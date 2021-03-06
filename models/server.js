const path = require("path");
const http = require("http");
const express = require("express");
const Sockets = require("./sockets");
const socketIO = require("socket.io");
const cors = require("cors");

class Server {
  constructor() {
    this.port = process.env.PORT || 8080;
    this.app = express();

    this.server = http.createServer(this.app);
    // PENDING faltan las configuraciones
    this.io = socketIO(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
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
