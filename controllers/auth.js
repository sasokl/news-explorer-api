const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const UnauthorizedErr = require('../errors/unauthorized-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

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
      switch (err.name) {
        case 'ValidationError':
          next(new BadRequestErr());
          break;
        case 'MongoError':
          next(new ConflictErr());
          break;
        default:
          next(err);
      }
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
      next(new UnauthorizedErr());
    });
};
