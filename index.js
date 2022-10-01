require('dotenv').config();
const express = require('express');
const app = express();
const routs = require('./src/routs');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/database/connection');
const httpCodes = require('http-status-codes').StatusCodes;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', routs);

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || httpCodes.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      status: err.status || httpCodes.INTERNAL_SERVER_ERROR,
      message: err.message
    }
  })
});

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) throw err;
  console.log(`========== STARTED ON PORT ${process.env.SERVER_PORT} ==========`);

  connectDB();
});
