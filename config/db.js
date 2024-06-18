const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
}

mongoose.set('strictQuery', true); // Not sure if I need this on my end since I didn't get the warning Brad did, but I'll put this here just in case. Seems helpful from the brief reading I did.

module.exports = connectDB;