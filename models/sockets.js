const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvent();
  }

  socketEvent() {
    this.io.on("connection", (socketClient) => {
      console.log("cliente conectado", socketClient.id);

      socketClient.emit("current-bands", this.bandList.getBands());

      socketClient.on("vote-band", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socketClient.on("remove-band", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socketClient.on("changename-band", ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socketClient.on("new-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
