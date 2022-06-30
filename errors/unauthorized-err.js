const { ERR_MSG } = require('../utils/constants');

class UnauthorizedErr extends Error {
  constructor() {
    super(ERR_MSG.unauthorized);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedErr;
