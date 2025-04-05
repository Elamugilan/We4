import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface LocationState {
  prediction: {
    risk: number;
    probability: number;
  };
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state as LocationState;

  useEffect(() => {
    const showResult = async () => {
      const result = await Swal.fire({
        title: prediction.risk === 1 ? 'High Risk of Stroke' : 'Low Risk of Stroke',
        html: `
          <div class="text-center">
            <p>Based on the provided information, there is a 
              <strong>${(prediction.probability * 100).toFixed(2)}%</strong> 
              probability of stroke risk.</p>
            ${prediction.risk === 1 ? 
              '<p class="text-danger">Please consult with a healthcare provider for further evaluation.</p>' :
              '<p class="text-success">Continue maintaining a healthy lifestyle and regular check-ups.</p>'
            }
          </div>
        `,
        icon: prediction.risk === 1 ? 'warning' : 'success',
        showCancelButton: true,
        confirmButtonText: 'New Prediction',
        cancelButtonText: 'Go Home',
      });

      if (result.isConfirmed) {
        navigate('/predict');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/');
      }
    };

    showResult();
  }, [prediction, navigate]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">Processing Results...</h2>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result; 