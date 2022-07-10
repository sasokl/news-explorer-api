const { ERR_MSG } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor(message = ERR_MSG.forbidden) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenErr;
