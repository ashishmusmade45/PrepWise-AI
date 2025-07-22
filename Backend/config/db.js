const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("MongoDB connected");
    }catch(err){
        console.log("Error connecting to the mongoDB",err);
        process.exit(1);
    }
};

module.exports = connectDB;