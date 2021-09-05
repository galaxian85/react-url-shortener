/* eslint-disable new-cap */
import express from 'express';
import {checkUrlValid, zipUrl} from '../../core/shortener';
import {serviceUrl} from '../../server';

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/list', (req, res) => {
  res.send({list: [
    {originUrl: '1', shortenUrl: '1'},
    {originUrl: '2', shortenUrl: '2'},
    {originUrl: '3', shortenUrl: '3'},
  ]});
});

export {router};
