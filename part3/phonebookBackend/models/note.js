require('dotenv').config();
const mongoose = require('mongoose');

console.log('connecting to mongodb');
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('successfully connected'))
  .catch((error) => console.log('failed to connect with error', error.message()));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
  },
});

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
