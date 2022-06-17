const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestErr = require('../errors/bad-request-err');
const UnauthorizedErr = require('../errors/unauthorized-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestErr('Some of user fields are wrong.'));
    else next(err);
  });

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        email,
        password: hash,
        name,
      },
    ))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr('Invalid data in user\'s fields'));
      else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedErr(`Authorization still Required: ${email}, ${password}`));
    });
};
