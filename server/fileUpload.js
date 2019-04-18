const error = require('serialize-error');
const {mapSeries: map} = require('p-iteration');
const hasha = require('hasha');

const parseDoc = require('./parseDoc');
const parseBookmarks = require('./parseBookmarks');
const searchByName = require('./config/searchByName');
const updateTag = require('./config/updateTag');

module.exports = api => async (req, res) => {
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

        if (buffer.indexOf(Buffer.from('\ufffd', 'utf16le')) !== -1) {
          throw new Error('Upload plain text files');
        }

        const body = buffer.toString('utf8');

        // Bookmarks file?
        if (filename === 'bookmarks.txt') {
          const list = parseBookmarks(body);
          // Update the documents with bookmarks.
          await map(list, async ([filename, tag]) => {
            const {data: {hits: {hits}}} = await api.post('/noted/_search', searchByName(filename));
            if (!hits.length) {
              throw new Error(`Document '${filename}' does't exist`);
            }
            await api.post(`/noted/_update/${hits[0]._id}`, updateTag(tag));
          });
          return {bookmarks: true};
        }

        const {title, date} = parseDoc(filename, body);
        const id = hasha(filename, {algorithm: 'md5'});

        await api.post(`/noted/_doc/${id}`, {
          filename,
          title,
          date,
          bookmarks: [],
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
};
