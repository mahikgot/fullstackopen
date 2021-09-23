require('dotenv').config();

const { MONGODB_URL } = process.env;
const { PORT } = process.env;

module.exports = {
  MONGODB_URL,
  PORT,
};
