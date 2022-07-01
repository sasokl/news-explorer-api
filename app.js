const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { DB_ADDRESS_DEV } = require('./utils/constants');
const routes = require('./routes/index');
const serverErrors = require('./middlewares/server-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');

const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;

const app = express();

// eslint-disable-next-line max-len
mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : DB_ADDRESS_DEV)
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

app.use(limiter);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(serverErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
