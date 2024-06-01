const { Schema } = require("mongoose");
const mongoose = require ("mongoose")

const BookingSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref:'User', required:true },
    place: { type: Schema.Types.ObjectId, ref:'Place', required:true },
    checkIn: {type:Date, required:true },
    checkOut: {type:Date, required:true },
    name: {type:String, required:true},
    mobile: {type:Number, required:true},
    price: Number,

});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;