const { ERR_MSG } = require('../utils/constants');

class BadRequestErr extends Error {
  constructor(message = ERR_MSG.badRequest) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestErr;
