const mongoose = require("mongoose");
async function connectDb() {
<<<<<<< HEAD
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
=======
    try {
   await mongoose.connect(process.env.MONGODB_URL,{ connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000 });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
>>>>>>> d421006088cb46ced9a955411cf707e0b4d5192b
}

exports.connectDb = connectDb;