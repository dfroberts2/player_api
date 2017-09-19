module.exports = (app) => {
  require('./players')(app);

  require('./matches')(app);
}