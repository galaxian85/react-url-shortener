/* eslint-disable new-cap */
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import APP from '../../client/components/App';
import {unzipUrl} from '../core/shortener';
import {router as apiRouter} from './api/api';

const router = express.Router();

router.use(apiRouter);

// server side rendered homepage
router.get('/(|login|signup|mypage)', (req, res) => {
  const content = renderToString(
      <StaticRouter location={req.path}>
        <APP />
      </StaticRouter>);

  const html = `
    <html lang="en">
      <head>
        <title>simple url shortener</title>
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
    res.redirect(`http://${url}`);
  } else {
    res.sendStatus(404);
  }
});

export default router;
