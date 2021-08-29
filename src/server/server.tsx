import express from 'express';
import router from './routes/router'
import { initDB } from './db/db';

initDB();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
