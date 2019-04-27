const error = require('serialize-error');
const {mapSeries: map} = require('p-iteration');
const hasha = require('hasha');

const searchByName = require('./query/searchByName');
const deleteTags = require('./query/deleteTags');
const updateTag = require('./query/updateTag');
const parseDoc = require('./utils/parseDoc');
const parseTags = require('./utils/parseTags');

const {TAGS_FILE} = require('./const');

module.exports = api => async (req, res) => {
  if (!req.files) {
    throw new Error('No files uploaded');
  }

  const files = await map(req.files, async file => {
    const {originalname: filename, mimetype: type, buffer} = file;

    try {
      if (!['text/plain', 'application/octet-stream'].includes(type)) {
        throw new Error(`Type ${type} not accepted, upload plain text files`);
      }

      if (buffer.indexOf(Buffer.from('\ufffd', 'utf16le')) !== -1) {
        throw new Error('Upload plain text files');
      }

      const body = buffer.toString('utf8');

      // Tags file?
      if (filename === TAGS_FILE) {
        // Delete existing.
        await api.post('/noted/_update_by_query', deleteTags());
        // Parse the file.
        const list = parseTags(body);
        // Update the documents with tags.
        await map(list, async ([filename, tag]) => {
          const {data: {hits: {hits}}} = await api.post('/noted/_search', searchByName(filename));
          if (!hits.length) {
            throw new Error(`Document '${filename}' does't exist`);
          }
          await api.post(`/noted/_update/${hits[0]._id}`, updateTag(tag));
        });
        return {tags: true};
      }

      // Handle a document.
      const {title, date} = parseDoc(filename, body);
      const id = hasha(filename, {algorithm: 'md5'});

      await api.post(`/noted/_doc/${id}`, {
        filename,
        title,
        date,
        body,
        tags: []
      });

      return {filename, date, title, id};
    } catch (err) {
      throw new Error(`${error(err).message} in file "${filename}"`);
    }
  });

  res.json({files});
};
