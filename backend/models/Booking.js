const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "CleaningService" },
    firstname: String,
    lastname: String,
    phonenumber: String,
    email: String,
    address: String,
    paymentMethod: String,
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
