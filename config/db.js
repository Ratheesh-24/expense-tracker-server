const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify: false
    });
    console.log("connected to database.");
  } catch (error) {
    console.log(error, "could not connect database.");
  }
};

module.exports = connectDB;