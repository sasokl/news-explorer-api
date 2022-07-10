const { ERR_MSG } = require('../utils/constants');

class ConflictErr extends Error {
  constructor(message = ERR_MSG.conflict) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictErr;
