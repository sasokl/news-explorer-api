const { ERR_MSG } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = ERR_MSG.notFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
