const nodemon = require('nodemon');

nodemon({
  script: 'server/api.js',
  ext: 'js json',
  watch: ['server']
});

nodemon.on('start', () =>
  console.log('API server has started')
).on('quit', () => {
  console.log('API server has quit');
  process.exit();
}).on('restart', files =>
  console.log('API server is restarting due to changes in: ', files)
);
