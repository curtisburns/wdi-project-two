const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/easel';

module.exports = {
  PORT,
  DB_URI
};
