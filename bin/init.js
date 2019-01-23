#!/usr/bin/env node
const axios = require('axios');

const index = require('../config/es/index');

const api = axios.create({
  baseURL: 'http://0.0.0.0:9200'
});

(async function() {
  try {
    await api.delete('/noted');
  } catch (err) {
    // Silently fail if index doesn't exist.
  }

  try {
    await api.put('/noted?pretty=true', index);
  } catch (err) {
    throw err.response.text;
  }

  console.log('Done');
})();
