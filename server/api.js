const path = require('path');
const {EOL} = require('os');

const express = require('express');
const nocache = require('nocache');
const multer = require('multer');
const axios = require('axios');
const hasha = require('hasha');
const chrono = require('chrono-node');
const error = require('serialize-error');
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

  const from = page ? parseInt(page, 10) : 1;

  try {
    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', merge([
      searchQuery,
      {query: {query_string: {query: q}}},
      {from: PAGE_LIMIT * (from - 1)}
    ]));

    if (total && !hits.length) {
      throw new Error(`Page ${page} doesn't exist`);
    }

    res.json({
      total,
      page: from,
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

  try {
    if (!q) {
      throw new Error(`Missing 'q' parameter`);
    }
    if (!page) {
      throw new Error(`Missing 'page' parameter`);
    }
    if (!index) {
      throw new Error(`Missing 'index' parameter`);
    }

    const from = PAGE_LIMIT * (parseInt(page, 10) - 1) + parseInt(index, 10) - 1;
    if (from >= 10000) {
      throw new Error(`Request window ${from} is too large`);
    }

    const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', merge([
      searchDoc,
      {query: {query_string: {query: q}}},
      {from}
    ]));

    if (!hits.length) {
      throw new Error(`Document on page '${page}' index '${index}' does't exist`);
    }

    res.json(mapHit(hits[0]));
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message, q});
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

      try {
        if (!['text/plain', 'application/octet-stream'].includes(type)) {
          throw new Error(`Type ${type} not accepted, upload plain text files`);
        }

        if (buffer.indexOf("\ufffd") !== -1) {
          throw new Error('Upload plain text files');
        }

        const body = buffer.toString('utf8');

        let dateObj = new Date(); // default date to now
        let title = '';

        let [line, ...rest] = body.split(EOL);
        if (rest.length) {
          let [datePart, titlePart] = line.split('-');

          if (titlePart) {
            title = titlePart.trim();
          }

          if (!datePart.match(/20\d\d/)) {
            throw new Error(`Unrecognized date in "${datePart}"`);
          }

          dateObj = chrono.parseDate(datePart);
        }

        // 2015-01-01T12:10:30Z
        const date = dateObj.toISOString().replace(/\.000/, '');

        const id = hasha(filename, {algorithm: 'md5'});

        await api.post(`/noted/doc/${id}`, {
          filename,
          title,
          date,
          body
        });

        return {filename, date, title, id};
      } catch (err) {
        throw new Error(`${error(err).message} in file "${filename}"`);
      }
    });

    res.json({files});
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message});
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
  date: hit._source.date,
  title: hit._source.title,
  body: hit.highlight['body.english']
});
