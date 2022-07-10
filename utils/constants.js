module.exports.DB_ADDRESS_DEV = 'mongodb://localhost:27017/news-explorer-db';

module.exports.JWT_SECRET_DEV = 'dev-secret';

module.exports.ERR_MSG = {
  // 400
  badRequest: 'Your browser sent a request that this server could not understand',
  // 409
  conflict: 'That resource is already exists in a database',
  emailExists: 'Email already in use',
  // 403
  forbidden: 'You do not have permission to access this resource.',
  // 404
  notFound: 'No resource found with that id',
  // 401
  authRequired: 'Authorization Required',
  userDataWrong: 'Incorrect email or password',
};
