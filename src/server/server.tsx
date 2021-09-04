import express from 'express';
import session from 'express-session';
import {initDB} from './db/db';
import router from './routes/router';

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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
