import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext"; // Import AuthContext
import "../styles/service.css";

const CleaningServicesPage = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phonenumber: user?.phonenumber || "",
    email: user?.email || "",
    address: "",
    paymentMethod: "credit-card",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cleaning-services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const openBookingForm = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const closeBookingForm = () => {
    setShowForm(false);
    setSelectedService(null);
    setFormData({ ...formData, address: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    if (!user || !user.id) {
      alert("You must be logged in to book a service.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, 
          serviceId: selectedService._id,
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenumber: formData.phonenumber,
          email: formData.email,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();
      console.log("Booking response:", data);

      if (!response.ok) throw new Error(data.message || "Booking failed");

      alert("Service booked successfully!");
      closeBookingForm();
    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="services-container">
      <h2>Our Cleaning Services</h2>
      {loading && <p>Loading services...</p>}
      {error && <p className="error">{error}</p>}

      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <button onClick={() => openBookingForm(service)}>Book Now</button>
          </div>
        ))}
      </div>

      {showForm && selectedService && (
        <div className="booking-modal">
          <div className="booking-form">
            <h3>Book {selectedService.name}</h3>
            <form onSubmit={handleBooking}>
              <label>First Name: <input type="text" name="firstname" value={formData.firstname} readOnly /></label>
              <label>Last Name: <input type="text" name="lastname" value={formData.lastname} readOnly /></label>
              <label>Phone Number: <input type="text" name="phonenumber" value={formData.phonenumber} readOnly /></label>
              <label>Email: <input type="email" name="email" value={formData.email} readOnly /></label>
              <label>Address: <input type="text" name="address" value={formData.address} onChange={handleInputChange} required /></label>
              <label>Payment Method: 
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash</option>
                </select>
              </label>
              <div className="form-buttons">
                <button type="submit">Confirm Booking</button>
                <button type="button" onClick={closeBookingForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleaningServicesPage;
