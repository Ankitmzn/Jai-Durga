import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Booking() {
  const [customerName, setCustomerName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [recentBooking, setRecentBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!customerName || !carModel || !serviceType || !bookingDate || !contactNumber || !address) {
      setErrorMessage('All fields are required!');
      return;
    }

    const bookingData = {
      customerName,
      carModel,
      serviceType,
      bookingDate,
      contactNumber,
      address,
    };

    try {
      const response = await axios.post('http://localhost:8081/api/booking', bookingData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setRecentBooking(response.data);
      setShowSuccessModal(true);
      setCustomerName('');
      setCarModel('');
      setServiceType('');
      setBookingDate('');
      setContactNumber('');
      setAddress('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : 'Something went wrong. Please try again.');
    }
  };

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBookings(filteredBookings);
  };
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleModalClose = () => {
    setShowSuccessModal(false);
    setRecentBooking(null);
    navigate('/');
  };

  return (
    <div className="container">
      <header className="my-4 text-center">
        <h2>Book Your Car Detailing Service</h2>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          
            <button className="btn btn-dark btn-lg mb-1" onClick={handleHomeClick}>
              Home
            </button>


            <div className="d-flex justify-content-center w-100">
             {/* <Link className="navbar-brand mx-auto" to="/">JAI DURGA CAR DETAILING</Link> */}
            </div>

            <form className="d-flex" role="search">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '200px', height: '35px' }}
              />
              <button
                className="btn btn-secondary"
                onClick={handleSearch}
                style={{
                  height: '35px',
                  fontSize: '1em',
                  padding: '0 20px',
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {bookings.length > 0 && (
        <div className="list-group mb-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-group-item">
              <strong>{booking.customerName}</strong> - {booking.carModel}
            </div>
          ))}
        </div>
      )}

      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      
      <form onSubmit={handleBooking} className="card p-4 shadow-lg" style={{ maxWidth: '600px', margin: 'auto' }}>
        {/* Customer Name Input */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="customerName"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <label htmlFor="customerName">Customer Name</label>
        </div>

        {/* Car Model Input */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="carModel"
            placeholder="Car Model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            required
          />
          <label htmlFor="carModel">Car Model</label>
        </div>

        {/* Service Type Selection */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          >
            <option value="" disabled>Select Service</option>
            <option value="basic">Basic Wash</option>
            <option value="premium">Premium Detail</option>
            <option value="full-service">Full Service</option>
          </select>
          <label htmlFor="serviceType">Service Type</label>
        </div>

        {/* Booking Date Input */}
        <div className="form-floating mb-3">
          <input
            type="datetime-local"
            className="form-control"
            id="bookingDate"
            placeholder="Booking Date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
          <label htmlFor="bookingDate">Booking Date</label>
        </div>

        {/* Contact Number Input */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <label htmlFor="contactNumber">Contact Number</label>
        </div>

        {/* Address Input */}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="address"
            placeholder="Address"
            style={{ height: '100px' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
          <label htmlFor="address">Address</label>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-4 py-2" style={{ fontSize: '1.2em' }}>
          Book Now
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && recentBooking && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><strong>Booking Confirmation</strong></h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <p><strong>Booking successful! Thank you for scheduling with us.</strong></p>
                <table className="table table-striped">
                  {/* Add recent booking details */}
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleModalClose}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
