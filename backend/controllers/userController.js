const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({ firstname, lastname, phonenumber, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add User
exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, phonenumber, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, email } = req.body;
    
    const user = await User.findByIdAndUpdate(req.params.id, 
      { firstname, lastname, phonenumber, email }, 
      { new: true }
    );
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
