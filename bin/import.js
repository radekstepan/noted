#!/usr/bin/env node
const path = require('path');
const {promisify} = require('util');
const {EOL} = require('os');
const crypto = require('crypto');

const axios = require('axios');
const glob = require('glob');
const fs = require('fs-extra');
const {mapSeries: map} = require('p-iteration');

const cwd = path.resolve(__dirname, '../../noted-docs/notes');

const api = axios.create({
  baseURL: 'http://0.0.0.0:9200'
});

(async function() {
  const files = await promisify(glob)('*.txt', {cwd});

  await map(files, async path => {
    const body = await fs.readFile(`${cwd}/${path}`, 'utf-8');

    let [title, ...rest] = body.split(EOL);
    if (!rest.length) {
      title = null;
    }

    const id = crypto.createHash('md5').update(path).digest('hex');
    try {
      await api.post(`/noted/doc/${id}`, {
        path,
        title,
        body
      });
      console.log(path);
    } catch (err) {
      throw err.response.text;
    }
  });

  console.log('Done');
})();
