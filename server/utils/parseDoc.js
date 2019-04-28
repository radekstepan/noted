const path = require('path');

const chrono = require('chrono-node');
const to = require('to-case');

module.exports = (filename, line) => {
  // Get date from the filename.
  let dateObj = chrono.parseDate(filename);
  // Grab title from the first line.
  let title = line;

  // Check date in the first line.
  if (!chrono.parseDate(line)) {
    if (!dateObj) {
      throw new Error('Must specify a date in either filename or title');
    }
  } else {
    // Parse the date from the first line.
    let [datePart, titlePart] = line.split('-');
    // Include title?
    if (titlePart) {
      title = titlePart.trim();
    } else {
      // Parse the title from the filename.
      title = to.sentence(path.parse(filename).name.replace(/\d+\-/g, ''));
    }
    // Check for correct date format.
    if (!datePart.match(/20\d\d/)) {
      throw new Error(`Unrecognized date in "${datePart}"`);
    }
    // Turn into a date.
    dateObj = chrono.parseDate(datePart);
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
