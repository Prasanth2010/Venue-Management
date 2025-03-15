import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';
import Sidebar from "../components/Sidebar";
function Settings() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    contactNumber: '',
    query: '',
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", contactInfo);
      alert("Thank you for contacting us!");
      setContactInfo({ name: "", email: "", contactNumber: "", query: "", subscribe: false }); // Reset form
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Failed to submit contact form.");
    }
  };

  return (
    <div className="settings-container">
      <Sidebar />
      <h2 className='us'>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-item">
          <label htmlFor="name" className='lab'>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactInfo.name}
            onChange={handleChange}
            required
            className='ip'
          />
        </div>
        <div className="form-item">
          <label htmlFor="email" className='lab'>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            required
            className='ip'
          />
        </div>
        <div className="form-item">
          <label htmlFor="contactNumber" className='lab'>Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={contactInfo.contactNumber}
            onChange={handleChange}
            required
            className='ip'
          />
        </div>
        <div className="form-item">
          <label htmlFor="query" className='lab'>Your Query:</label>
          <textarea
            id="query"
            name="query"
            rows="4"
            value={contactInfo.query}
            onChange={handleChange}
            required
            className='ip'
          />
        </div>
        <div className="form-item">
          <label className='lab'>
            <input
              type="checkbox"
              name="subscribe"
              checked={contactInfo.subscribe}
              onChange={handleChange}
              className='check'
            />
            Subscribe to our newsletter  
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Settings;
