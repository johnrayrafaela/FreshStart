import { useState, useEffect } from "react";
import "../styles/service.css"; // Ensure this CSS file exists

const CleaningServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cleaning-services"); // Adjust API URL if needed
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

    const handleBooking = async (serviceId) => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceId, userId: "12345" }), // Replace userId with actual user data
        });

        if (!response.ok) throw new Error("Booking failed");

        alert("Service booked successfully!");
      } catch (err) {
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
            <button onClick={() => handleBooking(service._id)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleaningServicesPage;
