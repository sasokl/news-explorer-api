const { ERR_MSG } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor() {
    super(ERR_MSG.forbidden);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenErr;
