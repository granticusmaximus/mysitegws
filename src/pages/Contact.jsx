import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_6a0eicb',
      'template_wckyasa',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message
      },
      'LZsBre8nt4txngJRO'
    ).then(
      (result) => {
        console.log(result.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        console.log(error.text);
        setStatus('Failed to send message. Please try again later.');
      }
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Back to Home</Link>
      </div>
      <h1>Contact Form</h1>
      <p>If there is anything I can help you with where software development is concerned, fill free to fill this form out and I will get back to you</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>Send Message</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default Contact;
