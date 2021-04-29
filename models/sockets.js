const BandList = require("./band-list");
const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socketClient) => {
      console.log("cliente conectado", socketClient.id);
      // NOTE con el callback podemos responderle automaticamente al frontend
      socketClient.on("request-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socketClient.on("next-ticket-work", ({ agent, desk }, callback) => {
        const ticket = this.ticketList.assignsTickets(agent, desk);
        callback(ticket);
        this.io.emit("ticket-assigned", this.ticketList.getLast13);
      });
    });
  }
}

module.exports = Sockets;
