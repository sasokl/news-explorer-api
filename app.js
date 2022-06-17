const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverErrors = require('./middlewares/server-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
// eslint-disable-next-line max-len
mongoose.connect('mongodb://localhost:27017/news-explorer-db')
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection successful');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  });

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);

app.use(errorLogger);

app.use(errors());

app.use(serverErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
