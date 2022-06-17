const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 1,
    maxlength: 254,
    required: true,
  },
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  text: {
    type: String,
    minlength: 1,
    required: true,
  },
  date: {
    type: String,
    minlength: 8,
    maxlength: 10,
    required: true,
  },
  source: {
    type: String,
    minlength: 1,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is invalid link`,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is invalid image link`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('card', articleSchema);
