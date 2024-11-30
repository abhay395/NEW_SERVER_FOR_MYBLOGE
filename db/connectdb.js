const mongoose = require("mongoose");
async function connectDb() {
    try {
   await mongoose.connect(process.env.MONGODB_URL,{ connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000 });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

exports.connectDb = connectDb