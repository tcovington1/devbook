const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//anytime we try an async await we want to put inside a try, catch just in case we get an error
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('MongoDB Connected...')
  } catch(err) {
    console.log(err.message);
    // Exit process w/ failure
    process.exit(1);
  }
}

module.exports = connectDB;