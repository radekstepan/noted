const path = require('path');

const express = require('express');
const nocache = require('nocache');
const multer = require('multer');
const axios = require('axios');

const searchQuery = require('./searchQuery');
const searchDoc = require('./searchDoc');
const searchDate = require('./searchDate');
const fileUpload = require('./fileUpload');
const deleteIndex = require('./deleteIndex');

const api = axios.create({
  baseURL: 'http://elasticsearch:9200'
});

const upload = multer();
const app = express();

app.use(nocache());

// Query search.
app.get('/api/search', searchQuery(api));

// Search a single doc.
app.get('/api/search/doc', searchDoc(api));

// View entries for a date.
app.get('/api/search/date', searchDate(api));

// File upload.
app.post('/api/upload', upload.any(), fileUpload(api));

// Delete the index.
app.delete('/api/index', deleteIndex(api));

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(9000);
