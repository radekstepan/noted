const {EOL} = require('os');

const hasha = require('hasha');
const chrono = require('chrono-node');
const error = require('serialize-error');
const {mapSeries: map} = require('p-iteration');

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

        // Get date from the filename.
        let dateObj = chrono.parseDate(filename);
        let title = null;
        let [line, ...rest] = body.split(EOL);

        if (rest.length - 1) {
          // Check date in the title.
          if (!chrono.parseDate(line)) {
            if (!dateObj) {
              throw new Error('Must specify a date in either filename or title');
            }
            // Grab title from the first line.
            title = line.trim();
          } else {
            // Parse the date from the first line.
            let [datePart, titlePart] = line.split('-');
            // Include title?
            if (titlePart) {
              title = titlePart.trim();
            }
            // Check for correct date format.
            if (!datePart.match(/20\d\d/)) {
              throw new Error(`Unrecognized date in "${datePart}"`);
            }
            // Turn into a date.
            dateObj = chrono.parseDate(datePart);
          }
        }

        // 2015-01-01T12:10:30Z
        const date = {
          datetime: dateObj.toISOString().replace(/\.000/, ''),
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
          day: dateObj.getDate()
        };

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
};
