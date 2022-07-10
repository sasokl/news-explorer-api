const { ERR_MSG } = require('../utils/constants');

class UnauthorizedErr extends Error {
  constructor(message = ERR_MSG.authRequired) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedErr;
