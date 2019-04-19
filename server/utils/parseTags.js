const {EOL} = require('os');
const slugify = require('slugify');

module.exports = body => body.split(EOL).reduce(([list, tag], line, i, src) => {
  line = line.trim();
  if (line) {
    if (line[0] === '-') {
      const filename = line.substr(1).trim();
      list.push([filename, tag]);
    } else {
      tag = slugify(line, {
        replacement: '-',
        lower: true
      });
    }
  }
  return src.length - 1 === i ? list : [list, tag];
}, [[], null]);
