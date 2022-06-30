const User = require('../models/user');
const BadRequestErr = require('../errors/bad-request-err');

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of user fields are wrong.'));
    else next(err);
  });
