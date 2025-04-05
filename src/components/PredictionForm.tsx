import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

interface FormData {
  name: string;
  age: string;
  gender: string;
  hypertension: string;
  heart_disease: string;
  ever_married: string;
  work_type: string;
  residence_type: string;
  avg_glucose_level: string;
  bmi: string;
  smoking_status: string;
}

const PredictionForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.hypertension) newErrors.hypertension = 'Hypertension status is required';
    if (!formData.heart_disease) newErrors.heart_disease = 'Heart disease status is required';
    if (!formData.ever_married) newErrors.ever_married = 'Marital status is required';
    if (!formData.work_type) newErrors.work_type = 'Work type is required';
    if (!formData.residence_type) newErrors.residence_type = 'Residence type is required';
    if (!formData.avg_glucose_level) newErrors.avg_glucose_level = 'Average glucose level is required';
    if (!formData.bmi) newErrors.bmi = 'BMI is required';
    if (!formData.smoking_status) newErrors.smoking_status = 'Smoking status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      navigate('/result', { state: { prediction: response.data } });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to get prediction. Please try again.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Stroke Risk Assessment</h2>
          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Hypertension</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.hypertension ? 'is-invalid' : ''}`}
                    name="hypertension"
                    value="1"
                    checked={formData.hypertension === '1'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.hypertension ? 'is-invalid' : ''}`}
                    name="hypertension"
                    value="0"
                    checked={formData.hypertension === '0'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {errors.hypertension && <div className="invalid-feedback d-block">{errors.hypertension}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Heart Disease</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.heart_disease ? 'is-invalid' : ''}`}
                    name="heart_disease"
                    value="1"
                    checked={formData.heart_disease === '1'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.heart_disease ? 'is-invalid' : ''}`}
                    name="heart_disease"
                    value="0"
                    checked={formData.heart_disease === '0'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {errors.heart_disease && <div className="invalid-feedback d-block">{errors.heart_disease}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Ever Married</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.ever_married ? 'is-invalid' : ''}`}
                    name="ever_married"
                    value="Yes"
                    checked={formData.ever_married === 'Yes'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className={`form-check-input ${errors.ever_married ? 'is-invalid' : ''}`}
                    name="ever_married"
                    value="No"
                    checked={formData.ever_married === 'No'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {errors.ever_married && <div className="invalid-feedback d-block">{errors.ever_married}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Work Type</label>
              <select
                className={`form-select ${errors.work_type ? 'is-invalid' : ''}`}
                name="work_type"
                value={formData.work_type}
                onChange={handleChange}
              >
                <option value="">Select Work Type</option>
                <option value="Private">Private</option>
                <option value="Govt_job">Government Job</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Children">Children</option>
                <option value="Never_worked">Never Worked</option>
              </select>
              {errors.work_type && <div className="invalid-feedback">{errors.work_type}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Residence Type</label>
              <select
                className={`form-select ${errors.residence_type ? 'is-invalid' : ''}`}
                name="residence_type"
                value={formData.residence_type}
                onChange={handleChange}
              >
                <option value="">Select Residence Type</option>
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
              {errors.residence_type && <div className="invalid-feedback">{errors.residence_type}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Average Glucose Level (mg/dL)</label>
              <input
                type="number"
                className={`form-control ${errors.avg_glucose_level ? 'is-invalid' : ''}`}
                name="avg_glucose_level"
                value={formData.avg_glucose_level}
                onChange={handleChange}
              />
              {errors.avg_glucose_level && <div className="invalid-feedback">{errors.avg_glucose_level}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">BMI</label>
              <input
                type="number"
                className={`form-control ${errors.bmi ? 'is-invalid' : ''}`}
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
              />
              {errors.bmi && <div className="invalid-feedback">{errors.bmi}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Smoking Status</label>
              <select
                className={`form-select ${errors.smoking_status ? 'is-invalid' : ''}`}
                name="smoking_status"
                value={formData.smoking_status}
                onChange={handleChange}
              >
                <option value="">Select Smoking Status</option>
                <option value="formerly smoked">Formerly Smoked</option>
                <option value="never smoked">Never Smoked</option>
                <option value="smokes">Smokes</option>
                <option value="Unknown">Unknown</option>
              </select>
              {errors.smoking_status && <div className="invalid-feedback">{errors.smoking_status}</div>}
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Predict Stroke Risk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm; 