// @ts-check
import express from "express";
import path from 'path'
import * as url from 'url'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import createMongoDBStore from 'connect-mongodb-session'

import setupApi from './api/index.js'

const MongoDBStore = createMongoDBStore(session)
const store = new MongoDBStore({
  uri: process.env.DATABASE_URL || '',
  collection: 'sessions',
})
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET || '',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store,
  resave: true,
  saveUninitialized: true
}))
setupApi(app)

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../ui-build')));

// Serve the React app for all routes
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../build-ui', 'index.html'));
});

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
