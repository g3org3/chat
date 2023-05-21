// @ts-check
import express from "express";
import path from 'path'
import * as url from 'url'
import cookieParser from 'cookie-parser'

import * as apiUser from './api/user.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../ui-build')));

// Serve the React app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build-ui', 'index.html'));
});

app.post('/api/user', (req, res) => {
  apiUser.input
    .parseAsync(req.body)
    .then(payload => apiUser.handler(payload))
    .then(r => res.status(200).json(r))
    .catch((e) => {
      console.error('[ERROR]', e.message)
      res.status(500).json({ status: 'error', message: e.message })
    })
})

// Start the server
const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
})
