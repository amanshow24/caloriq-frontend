import './Home.css';
import { useState } from 'react';

function Home() {
  const [formData, setFormData] = useState({
    Gender: 'male',
    Age: '',
    Height: '',
    Weight: '',
    Duration: '',
    Heart_Rate: '',
    Body_Temp: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      Gender: 'male',
      Age: '',
      Height: '',
      Weight: '',
      Duration: '',
      Heart_Rate: '',
      Body_Temp: ''
    });
    setResult(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    for (let key in formData) {
      if (formData[key] === '' || Number(formData[key]) < 0) {
        setError(`⚠️ Please enter valid, non-negative values for all fields.`);
        return;
      }
    }

    setLoading(true);
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.predicted_calories !== undefined) {
        setResult(data.predicted_calories);
      } else {
        setError('⚠️ ' + data.error);
      }
    } catch {
      setError('⚠️ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-left">
        <h1>🔥 Calories Predictor</h1>
        <p className="tagline">Your personal AI fitness assistant.</p>

        <ul>
          <li>💬 <strong>ML-based calorie estimation</strong></li>
          <li>⚡ <strong>Fast, simple, free</strong></li>
          <li>📊 <strong>Uses real workout data</strong></li>
          <li>🎯 <strong>Personalized predictions</strong></li>
          <li>📱 <strong>Responsive design</strong></li>
          <li>🛠️ <strong>Powered by Flask + React</strong></li>
        </ul>

        <p className="description">
          Whether you're just starting your fitness journey or you're a seasoned athlete, <strong>CalorIQ</strong> gives you insight into how your body responds to exercise.
        </p>

        <p className="description">
          Input simple workout details — like your age, weight, heart rate, and more — and instantly get a prediction of the calories you've burned. No wearable required.
        </p>

        <p className="description">
          Built with a focus on accuracy, accessibility, and ease-of-use — it's your free, intelligent companion for smarter fitness tracking.
        </p>
      </div>

      <div className="home-right">
        <form onSubmit={handleSubmit}>
          <label>
            Gender:
            <select name="Gender" value={formData.Gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Age:
            <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
          </label>
          <label>
            Height (cm):
            <input type="number" name="Height" value={formData.Height} onChange={handleChange} required />
          </label>
          <label>
            Weight (kg):
            <input type="number" name="Weight" value={formData.Weight} onChange={handleChange} required />
          </label>
          <label>
            Duration (min):
            <input type="number" name="Duration" value={formData.Duration} onChange={handleChange} required />
          </label>
          <label>
            Heart Rate (BPM):
            <input type="number" name="Heart_Rate" value={formData.Heart_Rate} onChange={handleChange} required />
          </label>
          <label>
            Body Temperature (°F):
            <input type="number" name="Body_Temp" value={formData.Body_Temp} onChange={handleChange} required />
          </label>

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? '⏳ Predicting...' : '🚀 Predict'}
            </button>
            <button type="button" onClick={handleReset} className="reset">
              Reset
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
        {result !== null && <p className="result">🔥 You burned about {result} calories!</p>}
      </div>
    </div>
  );
}

export default Home;
