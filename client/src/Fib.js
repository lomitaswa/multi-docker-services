import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Fib.css';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const result = await axios.get('/api/fib/values/current');
    setValues(result.data);
  };

  const fetchIndexes = async () => {
    const result = await axios.get('/api/fib/values/all');
    setSeenIndexes(result.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/fib/values', { index });
    setIndex('');
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    return Object.keys(values).map((key) => (
      <div key={key}>
        For index {key} I have calculated {values[key]}
      </div>
    ));
  };

  return (
    <div className="fib-container">
      <form onSubmit={handleSubmit} className="input-form">
        <label>Enter your index:</label>
        <div className="input-group">
          <input 
            value={index}
            onChange={event => setIndex(event.target.value)}
            type="number"
            placeholder="Enter a number"
          />
          <button type="submit">Calculate</button>
        </div>
      </form>

      <div className="results-section">
        <div className="result-block">
          <h3>Indexes I have seen:</h3>
          <div className="seen-indexes">{renderSeenIndexes()}</div>
        </div>

        <div className="result-block">
          <h3>Calculated values:</h3>
          <div className="calculated-values">{renderValues()}</div>
        </div>
      </div>
    </div>
  );
}

export default Fib;
