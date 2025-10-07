const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI is required in env');
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
