import React, { useState } from 'react';
import axios from 'axios';

const Diagnose = ()=> {
  const [formData, setFormData] = useState({
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concavity_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
    radius_se: '',
    texture_se: '',
    perimeter_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    radius_worst: '',
    texture_worst: '',
    perimeter_worst: '',
    area_worst: '',
    smoothness_worst: '',
    compactness_worst: '',
    concavity_worst: '',
    concave_points_worst: '',
    symmetry_worst: '',
    fractal_dimension_worst: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      
      const { prediction_text } = response.data;
      setPrediction(prediction_text);
    } catch (error) {
      console.error('Error:', error);
    }
    // try {
    //   const response = await fetch('http://localhost:5000/predict', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   setPrediction(data.prediction_text);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div className="diagnose">
      <form className="inputForm" onSubmit={handleSubmit}>
        <label>Radius Mean:</label>
        <input
          type="text"
          name="radius_mean"
          placeholder="Radius Mean"
          value={formData.radius_mean}
          onChange={handleChange}
        />

        <label>Texture Mean:</label>
        <input
          type="text"
          name="texture_mean"
          placeholder="Texture Mean"
          value={formData.texture_mean}
          onChange={handleChange}
        />

        <label>Perimeter Mean:</label>
        <input
          type="text"
          name="perimeter_mean"
          placeholder="Perimeter Mean"
          value={formData.perimeter_mean}
          onChange={handleChange}
        />

        <label>Area Mean:</label>
        <input
          type="text"
          name="area_mean"
          placeholder="Area Mean"
          value={formData.area_mean}
          onChange={handleChange}
        />

        <label>Smoothness Mean:</label>
        <input
          type="text"
          name="smoothness_mean"
          placeholder="Smoothness Mean"
          value={formData.smoothness_mean}
          onChange={handleChange}
        />

        <label>Compactness Mean:</label>
        <input
          type="text"
          name="compactness_mean"
          placeholder="Compactness Mean"
          value={formData.compactness_mean}
          onChange={handleChange}
        />

        <label>Concavity Mean:</label>
        <input
          type="text"
          name="concavity_mean"
          placeholder="Concavity Mean"
          value={formData.concavity_mean}
          onChange={handleChange}
        />

        <label>Concave Points Mean:</label>
        <input
          type="text"
          name="concave_points_mean"
          placeholder="Concave Points Mean"
          value={formData.concave_points_mean}
          onChange={handleChange}
        />

        <label>Symmetry Mean:</label>
        <input
          type="text"
          name="symmetry_mean"
          placeholder="Symmetry Mean"
          value={formData.symmetry_mean}
          onChange={handleChange}
        />

        <label>Fractal Dimension Mean:</label>
        <input
          type="text"
          name="fractal_dimension_mean"
          placeholder="Fractal Dimension Mean"
          value={formData.fractal_dimension_mean}
          onChange={handleChange}
        />

        <label>Radius SE:</label>
        <input
          type="text"
          name="radius_se"
          placeholder="Radius SE"
          value={formData.radius_se}
          onChange={handleChange}
        />

        <label>Texture SE:</label>
        <input
          type="text"
          name="texture_se"
          placeholder="Texture SE"
          value={formData.texture_se}
          onChange={handleChange}
        />

        <label>Perimeter SE:</label>
        <input
          type="text"
          name="perimeter_se"
          placeholder="Perimeter SE"
          value={formData.perimeter_se}
          onChange={handleChange}
        />

        <label>Area SE:</label>
        <input
          type="text"
          name="area_se"
          placeholder="Area SE"
          value={formData.area_se}
          onChange={handleChange}
        />

        <label>Smoothness SE:</label>
        <input
          type="text"
          name="smoothness_se"
          placeholder="Smoothness SE"
          value={formData.smoothness_se}
          onChange={handleChange}
        />

        <label>Compactness SE:</label>
        <input
          type="text"
          name="compactness_se"
          placeholder="Compactness SE"
          value={formData.compactness_se}
          onChange={handleChange}
        />

        <label>Concavity SE:</label>
        <input
          type="text"
          name="concavity_se"
          placeholder="Concavity SE"
          value={formData.concavity_se}
          onChange={handleChange}
        />

        <label>Concave Points SE:</label>
        <input
          type="text"
          name="concave_points_se"
          placeholder="Concave Points SE"
          value={formData.concave_points_se}
          onChange={handleChange}
        />

        <label>Symmetry SE:</label>
        <input
          type="text"
          name="symmetry_se"
          placeholder="Symmetry SE"
          value={formData.symmetry_se}
          onChange={handleChange}
        />

        <label>Fractal Dimension SE:</label>
        <input
          type="text"
          name="fractal_dimension_se"
          placeholder="Fractal Dimension SE"
          value={formData.fractal_dimension_se}
          onChange={handleChange}
        />

        <label>Radius Worst:</label>
        <input
          type="text"
          name="radius_worst"
          placeholder="Radius Worst"
          value={formData.radius_worst}
          onChange={handleChange}
        />

        <label>Texture Worst:</label>
        <input
          type="text"
          name="texture_worst"
          placeholder="Texture Worst"
          value={formData.texture_worst}
          onChange={handleChange}
        />

        <label>Perimeter Worst:</label>
        <input
          type="text"
          name="perimeter_worst"
          placeholder="Perimeter Worst"
          value={formData.perimeter_worst}
          onChange={handleChange}
        />

        <label>Area Worst:</label>
        <input
          type="text"
          name="area_worst"
          placeholder="Area Worst"
          value={formData.area_worst}
          onChange={handleChange}
        />

        <label>Smoothness Worst:</label>
        <input
          type="text"
          name="smoothness_worst"
          placeholder="Smoothness Worst"
          value={formData.smoothness_worst}
          onChange={handleChange}
        />

        <label>Compactness Worst:</label>
        <input
          type="text"
          name="compactness_worst"
          placeholder="Compactness Worst"
          value={formData.compactness_worst}
          onChange={handleChange}
        />

        <label>Concavity Worst:</label>
        <input
          type="text"
          name="concavity_worst"
          placeholder="Concavity Worst"
          value={formData.concavity_worst}
          onChange={handleChange}
        />

        <label>Concave Points Worst:</label>
        <input
          type="text"
          name="concave_points_worst"
          placeholder="Concave Points Worst"
          value={formData.concave_points_worst}
          onChange={handleChange}
        />

        <label>Symmetry Worst:</label>
        <input
          type="text"
          name="symmetry_worst"
          placeholder="Symmetry Worst"
          value={formData.symmetry_worst}
          onChange={handleChange}
        />

        <label>Fractal Dimension Worst:</label>
        <input
          type="text"
          name="fractal_dimension_worst"
          placeholder="Fractal Dimension Worst"
          value={formData.fractal_dimension_worst}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
  );
}

export default Diagnose;
