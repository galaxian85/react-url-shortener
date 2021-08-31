/* eslint-disable new-cap */
import express from 'express';
import {zipUrl, checkUrlValid} from '../../core/shortener';

const router = express.Router();
const serviceUrl = 'http://localhost:3000/';

router.post('/url', async (req, res) => {
  const response = {
    shortenUrl: '',
    isUrlValid: false,
  };
  const url = req.body.url;
  response.isUrlValid = await checkUrlValid(url);
  if (response.isUrlValid) {
    response.shortenUrl = `${serviceUrl}${await zipUrl(url)}`;
  }
  res.send(response);
});

export {router};
