import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import APP from '../client/components/APP';

const app = express();

app.use(express.static("public"));
app.get('/', (req, res) => {
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

app.post('/api', (req, res) => {
  res.send('some data from server');
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
