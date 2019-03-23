const path = require('path');

const express = require('express');
const nocache = require('nocache');
const axios = require('axios');
const {all: merge} = require('deepmerge');

const esSearch = require('../config/es/search');
const esDoc = require('../config/es/doc');

const PAGE_LIMIT = 10;

const api = axios.create({
  baseURL: 'http://0.0.0.0:9200'
});

const app = express();

app.use(nocache());

// Query search.
app.get('/api/search', async (req, res) => {
  const {query: {q, page}} = req;

  const from = page ? parseInt(page, 10) - 1 : 0;

  try {
    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', merge([
      esSearch,
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
      esDoc,
      {query: {query_string: {query: q}}},
      {from: (PAGE_LIMIT * from) + parseInt(index, 10)}
    ]));

    res.json(mapHit(hits[0]));
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`, q});
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
  path: hit._source.path,
  title: hit._source.title,
  body: hit.highlight['body.english']
});
