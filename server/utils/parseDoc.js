const {EOL} = require('os');

const chrono = require('chrono-node');

module.exports = (filename, body) => {
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

  return {date, title};
};
