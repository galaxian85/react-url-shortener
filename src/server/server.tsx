import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import {initDB} from './db/db';
import router from './routes/router';

export const isProduction = process.env.NODE_ENV === 'production';
export let serviceUrl: string;
if (isProduction) {
  const result = dotenv.config();
  if (result.error) { // heroku
    serviceUrl = process.env.SERVICE_URL;
  } else { // local
    serviceUrl = result.parsed.SERVICE_URL;
  }
} else {
  serviceUrl = 'http://localhost:3000';
}

initDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(router);
app.use(session({
  secret: 'Penguin',
  resave: false,
  saveUninitialized: false,
}));


if (!isProduction) {
  // development error handler
  // will print stacktrace
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err,
    }});
  });
} else {
  // production error handler
  // no stacktrace leaked
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {},
    }});
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
