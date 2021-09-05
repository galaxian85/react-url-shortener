/* eslint-disable new-cap */
import express from 'express';
import {checkUrlValid, idToShortenId, zipUrl} from '../../core/shortener';
import {addHistory, getAllHistory} from '../../db/db';
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
    const zipped = zipUrl(url);
    const shortenUrl = idToShortenId(zipped);
    response.shortenUrl = `${serviceUrl}/${shortenUrl}`;

    const username = req.session.username;
    if (username) {
      addHistory(username, zipped);
    }
  }

  res.send(response);
});

router.get('/list', (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.send(403);
    return;
  }

  res.send({list: getAllHistory(username)});
});

export {router};
