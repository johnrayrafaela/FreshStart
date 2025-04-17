const Employee = require("../models/Employee");

// Create employee
exports.createEmployee = async (req, res) => {
    try {
      const { name, email, phone, role, availability } = req.body;
  
      if (!name || !email || !phone || !role) {
        return res.status(400).json({ message: "Name, email, phone, and role are required" });
      }
  
      // Set availability to true by default if not provided
      const newEmployee = new Employee({ 
        name, 
        email, 
        phone, 
        role, 
        availability: availability !== undefined ? availability : true // default to true
      });
      await newEmployee.save();
  
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

  

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update employee availability or info
exports.updateEmployee = async (req, res) => {
    try {
      const { name, email, phone, role, availability } = req.body;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, role, availability },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
