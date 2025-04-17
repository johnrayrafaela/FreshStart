import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/employee.css"; // Custom styles for your employee list
import defaultProfile from "../assets/images/default_profile.jpg";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch employee data from the backend
    axios.get('http://localhost:5000/api/employees')
      .then((response) => {
        console.log(response.data); // Check the response data in the console
        setEmployees(response.data); // Store employee data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error(err); // Log errors
        setError("Failed to load employee data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className="profile-container">
      <div className="employees-container">
        <h2>Our Team</h2>
        <div className="employees-list">
          {employees.length === 0 ? (
            <p>No employees available</p> // Handle case where no employees exist
          ) : (
            employees.map((employee) => (
              <div className="profile-card" key={employee._id}>
                <div className="profile-header">
                  <div className="">
                    {/* Placeholder for employee avatar */}
                    <img src={defaultProfile} alt="avatar" className="employee-image" />
                  </div>
                  <h2>{employee.name}</h2>
                </div>
                <div className="profile-info">
                  <p><strong>Role:</strong> {employee.role}</p>
                  <p><strong>Phone:</strong> {employee.phone}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  <p className={`availability-status ${employee.availability ? 'available' : 'not-available'}`}>
                    <span>{employee.availability ? "Available" : "Not Available"}</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
