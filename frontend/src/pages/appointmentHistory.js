import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/appointmentHistory.css";

const AppointmentHistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ensure user.id exists before making the API call
    if (user?.id) {
      const fetchBookings = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/bookings/all");
          if (!response.ok) throw new Error("Failed to fetch bookings");
          const data = await response.json();

          // Check and log the data structure
          console.log(data);

          // Filter for current user bookings
          const userBookings = data.filter(
            (booking) => booking.userId && booking.userId._id === user.id
          );

          setBookings(userBookings);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch bookings");
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="appointment-history">
      <h2>Your Appointment History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && bookings.length === 0 && (
        <div className="no-booking">
          <p>No bookings found.</p>
          <Link to="/appointment">
            <button className="book-now-btn">Book Now</button>
          </Link>
        </div>
      )}

      {bookings.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <p>
            <strong>Booked At:</strong>{" "}
            {new Date(booking.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Name:</strong> {booking.firstname} {booking.lastname}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>Service:</strong> {booking.serviceId?.name || "N/A"}
          </p>
          <p>
            <strong>Price:</strong> ${booking.serviceId?.price || 0}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${booking.status?.toLowerCase() || "unknown"}`}>
              {booking.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentHistoryPage;
