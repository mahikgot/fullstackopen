require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL;

module.exports = {
  MONGODB_URL,
  PORT,
};
