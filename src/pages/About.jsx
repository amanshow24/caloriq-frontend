import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About <span className="highlight">CalorIQ</span></h2>
        <p><strong>Calories Burnt Predictor</strong> is a machine learning-powered tool that helps you estimate the number of calories you’ve burned based on your workout data.</p>

        <p>It uses a regression model trained on real workout metrics like:</p>

        <ul>
          <li>🧍 Gender</li>
          <li>🎂 Age</li>
          <li>📏 Height</li>
          <li>⚖️ Weight</li>
          <li>⏱️ Workout Duration</li>
          <li>❤️ Heart Rate</li>
          <li>🌡️ Body Temperature</li>
        </ul>

        <p>
          The model is trained using <strong>Python</strong> and <strong>scikit-learn</strong>, and the backend is powered by <strong>Flask</strong>.
          This site is built using <strong>React</strong> with a clean, responsive design.
        </p>

        <p>
          Whether you're curious about your calorie burn after a workout or building healthy habits,
          <strong> CalorIQ</strong> helps you stay informed and motivated.
        </p>
      </div>
    </div>
  );
};

export default About;
