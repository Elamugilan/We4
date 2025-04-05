import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Early Prediction of Brain Stroke</h1>
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3">Understanding Brain Stroke</h2>
              <p className="lead">
                A brain stroke occurs when blood flow to the brain is interrupted, causing brain cells to die.
                Early prediction and intervention can significantly improve outcomes and save lives.
              </p>
              <p>
                Our advanced machine learning model analyzes various risk factors to predict the likelihood
                of a stroke, helping healthcare providers and individuals take preventive measures.
              </p>
            </div>
          </div>
          <button
            className="btn btn-dark btn-lg px-5"
            onClick={() => navigate('/predict')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 