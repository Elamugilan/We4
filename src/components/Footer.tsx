import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: contact@MediCare.com</p>
            <p>Phone: +91 9791699627</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h5>Credits</h5>
            <p>© 2024 Stroke Prediction App</p>
            <p>Developed with ❤️ for better healthcare</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 