const { ERR_MSG } = require('../utils/constants');

class NotFoundError extends Error {
  constructor() {
    super(ERR_MSG.notFound);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
