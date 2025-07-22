const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    role:{type:String, required:true},
    experience:{type:String,required:true},
    topicToFocus:{type:String, required:true},
    description:String,
    questions:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}],
},{timestamps:true});

module.exports = mongoose.model("Session",sessionSchema);