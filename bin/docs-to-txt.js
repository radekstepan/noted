const path = require('path');
const {promisify} = require('util');
const {EOL} = require('os');

const glob = require('glob');
const chrono = require('chrono-node');
const truncate = require('smart-truncate');
const slugify = require('slugify');
const fs = require('fs-extra');

const cwd = path.resolve(__dirname, '../../noted-docs/input');
const output = path.resolve(__dirname, '../../noted-docs/notes');

(async function() {
  const files = await promisify(glob)('*.txt', { cwd });

  await fs.emptyDir(output);

  return Promise.all(files.map(async file => {
    let body = await fs.readFile(`${cwd}/${file}`, 'utf-8');

    // Get the link index.
    const links = {};
    body = body.replace(/\[(\d+)\] (http\S+)/g, (match, i, http) => {
        links[i] = http;
        return '';
    });

    return body
    // Split input document into dates.
    .split('________________').map(day => {
      // Resolve ibid references.
      if (day.indexOf('- ibid')) {
        day = day.replace(/- ibid/g, (_match, offset) => {
          const sub = day.substr(0, offset);
          const refs = sub.match(new RegExp(`${EOL}(- [^${EOL}]*)`, 'g'));
          if (!refs) throw `Can't find ref in ${sub}`;
          return refs.reverse().find(r => !r.match(/ibid/)).trim() + EOL;
        });
      }

      // Use `chrono` on each first line of an entry (after trimming whitespace) and bail if `null` returned.
      let [first, ...rest] = day.trim().split(EOL);

      // Do we have a year?
      if (!first.match(/201/)) {
          throw `No year found in ${first}, ${file}`;
      }

      let date = chrono.parseDate(first);
      if (!date) throw `Date not found in "${day}"`;

      date = date.toISOString().substring(0, 10);

      // If you find at least `---` then generate a new entry for the date.
      return rest.join(EOL).replace(/[-]{3,}/mg, '---').split('---').map(async (entry, i, arr) => {
        // Cleanup entry.
        entry = entry.replace(/[\r\n]{3,}/mg, [EOL, EOL].join(''));

        // Generate entry prefix?
        const pad = (num, size) => ('0000' + num).substr(-size);
        const size = num => `${num}`.length;
        const prefix = arr.length > 1 ? pad(i + 1, size(arr.length)) + '-' : '';

        // Generate title.
        const title = truncate(entry.trim().split(EOL, 1)[0], 40, {mark: ''});
        const name = `${date}-${prefix}${slugify(title.replace(/[^\w\s]/gi, ''), {
          replacement: '_',
          lower: true,
        })}`;

        // Include link index.
        const l = entry.match(/\[(\d+)\]/g);
        if (l) {
          entry += EOL;
          l.forEach(i => {
            i = i.replace(/\D+/g, '');
            if (!links[i]) throw `Unknown index ${i}`;
            entry += `${EOL}[${i}] ${links[i]}`;
          });
        }

        const text = [first.trim(), entry.trim()].join([EOL, EOL].join(''));
        return fs.writeFile(`${output}/${name}.txt`, text);
      });
    }, []);
  }));
})();
