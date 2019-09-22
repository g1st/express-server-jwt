require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(cors());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(morgan('combined'));
app.enable('trust proxy');
app.use(bodyParser.json({ type: '*/*' }));

router(app);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
