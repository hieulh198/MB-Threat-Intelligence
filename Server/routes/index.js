const status = require('../src/bazaar/routes');

module.exports = (app) => {
  app.use('/bazaar', status);
  app.use('*', (req, res) => {
    res.send('Not found!');
  });
};
