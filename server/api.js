const path = require('path');
const {EOL} = require('os');
const crypto = require('crypto');

const express = require('express');
const nocache = require('nocache');
const multer = require('multer');
const axios = require('axios');
const {all: merge} = require('deepmerge');
const {mapSeries: map} = require('p-iteration');

const searchIndex = require('../config/searchIndex');
const searchQuery = require('../config/searchQuery');
const searchDoc = require('../config/searchDoc');

const PAGE_LIMIT = 10;

const api = axios.create({
  baseURL: 'http://elasticsearch:9200'
});

const upload = multer();
const app = express();

app.use(nocache());

// Query search.
app.get('/api/search', async (req, res) => {
  const {query: {q, page}} = req;

  const from = page ? parseInt(page, 10) - 1 : 0;

  try {
    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', merge([
      searchQuery,
      {query: {query_string: {query: q}}},
      {from: PAGE_LIMIT * from}
    ]));

    res.json({
      total,
      page: from + 1,
      pages: Math.ceil(total / PAGE_LIMIT),
      limit: PAGE_LIMIT,
      hits: hits.map(mapHit)
    });
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`, q});
  }
});

// Search a single doc.
app.get('/api/search/doc', async (req, res) => {
  const {query: {q, page, index}} = req;

  const from = page ? parseInt(page, 10) - 1 : 0;

  try {
    if (!q) {
      throw new Error(`Missing 'q' parameter`);
    }
    if (!index) {
      throw new Error(`Missing 'index' parameter`);
    }

    const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', merge([
      searchDoc,
      {query: {query_string: {query: q}}},
      {from: (PAGE_LIMIT * from) + parseInt(index, 10)}
    ]));

    res.json(mapHit(hits[0]));
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`, q});
  }
});

// File upload.
app.post('/api/upload', upload.any(), async (req, res) => {
  try {
    if (!req.files) {
      throw new Error('No files uploaded');
    }

    const files = await map(req.files, async file => {
      const {originalname: filename, mimetype: type, buffer} = file;

      if (!['text/plain', 'application/octet-stream'].includes(type)) {
        throw new Error(`Type ${type} not accepted, upload plain text files`);
      }

      const body = buffer.toString('utf8');

      if (/\ufffd/.test(body)) {
        throw new Error('Upload plain text files');
      }

      let [title, ...rest] = body.split(EOL);
      if (!rest.length) {
        title = null;
      }

      const id = crypto.createHash('md5').update(filename).digest('hex');

      await api.post(`/noted/doc/${id}`, {
        filename,
        title,
        body
      });

      return {filename, id};
    });

    res.json({files});
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`});
  }
});

// Delete the index.
app.delete('/api/index', async (req, res) => {
  try {
    await api.delete('/noted');
  } catch (err) {
    // Silently fail if index doesn't exist.
  }

  try {
    await api.put('/noted', searchIndex);
    res.status(204).send({});
  } catch (err) {
    res.status(500);
    res.json({error: err.response.text});
  }
});

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(9000);

const mapHit = hit => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  title: hit._source.title,
  body: hit.highlight['body.english']
});
