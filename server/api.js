const express = require('express');
const nocache = require('nocache');
const multer = require('multer');
const axios = require('axios');

const searchQuery = require('./searchQuery');
const searchDoc = require('./searchDoc');
const fileUpload = require('./fileUpload');
const deleteIndex = require('./deleteIndex');

const {ES_HOST='0.0.0.0', ES_PORT=9200} = process.env;

const api = axios.create({
  baseURL: `http://${ES_HOST}:${ES_PORT}`
});

const upload = multer();
const app = express();

app.use(nocache());

// Query search for text or date.
app.get('/api/search', searchQuery(api));

// Search a single doc.
app.get('/api/search/doc', searchDoc(api));

// File upload.
app.post('/api/upload', upload.any(), fileUpload(api));

// Delete the index.
app.delete('/api/index', deleteIndex(api));

app.listen(9000);
