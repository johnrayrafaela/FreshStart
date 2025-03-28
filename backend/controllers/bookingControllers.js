const Booking = require("../models/Booking");

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    console.log("Incoming Booking Request:", req.body); // Log request data

    const { userId, serviceId, firstname, lastname, phonenumber, email, address, paymentMethod } = req.body;

    if (!userId || !serviceId || !firstname || !lastname || !phonenumber || !email || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save booking
    const newBooking = new Booking({
      userId,
      serviceId,
      firstname,
      lastname,
      phonenumber,
      email,
      address,
      paymentMethod,
    });

    await newBooking.save();

    console.log("Booking created successfully:", newBooking);
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").populate("serviceId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId").populate("serviceId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
