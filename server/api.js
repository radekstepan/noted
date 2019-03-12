const path = require('path');

const express = require('express');
const axios = require('axios');
const {all: merge} = require('deepmerge');

const esSearch = require('../config/es/search');
const esDoc = require('../config/es/doc');

const api = axios.create({
  baseURL: 'http://0.0.0.0:9200'
});

const app = express();

// Query search.
app.get('/api/search', async (req, res) => {
  const {query: {query, page}} = req;

  try {
    const {data} = await api.post('/noted/doc/_search', merge([
      esSearch,
      {query: {query_string: {query}}},
      {from: page ? page - 1 : 0}
    ]));

    res.json(data);
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`, query});
  }
});

// Search a single doc.
app.get('/api/search/doc', async (req, res) => {
  const {query: {query, index}} = req;

  try {
    if (!query) {
      throw new Error(`Missing 'query' parameter`);
    }

    const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', merge([
      esDoc,
      {query: {query_string: {query}}},
      {from: index}
    ]));

    res.json(hits[0]);
  } catch (err) {
    res.status(500);
    res.json({error: `${err}`, query});
  }
});

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(9000);
