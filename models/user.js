const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { ERR_MSG } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email`,
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr(ERR_MSG.userDataWrong));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedErr(ERR_MSG.userDataWrong));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
