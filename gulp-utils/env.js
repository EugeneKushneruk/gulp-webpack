const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  isDev
};
