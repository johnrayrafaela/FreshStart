const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "CleaningService", required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ["credit-card", "paypal", "cash"], required: true },
    status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
