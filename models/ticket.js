const { v4: uuidv4 } = require("uuid");

class Ticket {
  constructor(lastNumber) {
    this.id = uuidv4();
    this.number = lastNumber;
    this.desk = null;
    this.agent = null;
  }
}

module.exports = Ticket;
