import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cleaning-services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      await axios.post("http://localhost:5000/api/cleaning-services/add", newService, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices(); 
      setNewService({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddService}>
        <input type="text" placeholder="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} required />
        <input type="number" placeholder="Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} required />
        <button type="submit">Add Service</button>
      </form>

      <h3>Existing Services</h3>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name} - {service.description} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
