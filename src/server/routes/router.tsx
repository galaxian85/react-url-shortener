/* eslint-disable new-cap */
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {router as apiRouter} from './api/api';
import {unzipUrl} from '../core/shortener';
import APP from '../../client/components/App';

const router = express.Router();

router.use(apiRouter);

// server side rendered homepage
router.get('/', (req, res) => {
  const content = renderToString(<APP />);

  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="main.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

// the redirect service
router.get('/:shortenId', async (req, res) => {
  const url = await unzipUrl(req.params.shortenId);
  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(404);
  }
});

export default router;
