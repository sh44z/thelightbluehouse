const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    phone: Number,
    password: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;