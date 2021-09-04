/* eslint-disable new-cap */
import express from 'express';
import {checkUrlValid, zipUrl} from '../../core/shortener';
import {serviceUrl} from '../../server';

const router = express.Router();

router.post('/url', async (req, res) => {
  const response = {
    shortenUrl: '',
    isUrlValid: false,
  };
  const url = req.body.url.trim();
  response.isUrlValid = await checkUrlValid(url);
  if (response.isUrlValid) {
    response.shortenUrl = `${serviceUrl}/${zipUrl(url)}`;
  }
  res.send(response);
});

export {router};
