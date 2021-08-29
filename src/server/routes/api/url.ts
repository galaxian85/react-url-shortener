import express from 'express';
import { zipUrl } from '../../core/shortener';

const router = express.Router();
const serviceUrl = 'http://localhost:3000/';

router.post('/url', async (req, res) => {
  const shortenId = await zipUrl(req.body.url);
  res.send(`${serviceUrl}${shortenId}`);
});

export { router };
