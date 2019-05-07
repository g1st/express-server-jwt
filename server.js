require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const { PORT, MONGODB_URL } = process.env;

const app = express();
app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true });

app.use(morgan('combined'));
app.enable('trust proxy');
app.use(bodyParser.json({ type: '*/*' }));

router(app);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
