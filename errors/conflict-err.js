const { ERR_MSG } = require('../utils/constants');

class ConflictErr extends Error {
  constructor() {
    super(ERR_MSG.conflict);
    this.statusCode = 409;
  }
}

module.exports = ConflictErr;
