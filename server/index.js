const nocache = require('nocache');
const multer = require('multer');

const express = require('./express');
const elasticApi = require('./elasticApi');
const searchByQuery = require('./searchByQuery');
const searchDoc = require('./searchDoc');
const getDoc = require('./getDoc');
const getToday = require('./getToday');
const getTags = require('./getTags');
const deleteTags = require('./deleteTags');
const fileUpload = require('./fileUpload');
const deleteIndex = require('./deleteIndex');

const {ES_HOST='0.0.0.0', ES_PORT=9200} = process.env;

const api = elasticApi(ES_HOST, ES_PORT);
const upload = multer();
const app = express();

app.use(nocache());

// Query search for text or date.
app.get('/api/search', searchByQuery(api));

// Search a single doc.
app.get('/api/search/doc', searchDoc(api));

// Get a doc.
app.get('/api/doc/:id', getDoc(api));

// Get docs on this day.
app.get('/api/today', getToday(api));

// Get tags.
app.get('/api/tags', getTags(api));

// Delete tags.
app.delete('/api/tags', deleteTags(api));

// File upload.
app.post('/api/upload', upload.any(), fileUpload(api));

// Delete the index.
app.delete('/api/index', deleteIndex(api));

app.listen(9000);
