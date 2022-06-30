const { ERR_MSG } = require('../utils/constants');

class BadRequestErr extends Error {
  constructor() {
    super(ERR_MSG.badRequest);
    this.statusCode = 400;
  }
}

module.exports = BadRequestErr;
