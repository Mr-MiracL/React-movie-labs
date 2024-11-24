
import React, { useState, useEffect } from 'react';

function MovieRating() {
  const [rating, setRating] = useState(0); 
  const [error, setError] = useState(''); 
  const [submittedRating, setSubmittedRating] = useState(null); 

 
  useEffect(() => {
    const savedRating = localStorage.getItem('movieRating');
    if (savedRating) {
      setSubmittedRating(savedRating); 
      setRating(savedRating); 
    }
  }, []);

  
  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value >= 1 && value <= 10) {
      setRating(value);
      setError(''); 
    } else if (value === '') {
      setRating(0); 
      setError('');
    } else {
      setError('Please enter a rating between 1 and 10.');
    }
  };

  
  const handleSubmit = () => {
    if (rating >= 1 && rating <= 10) {
      setSubmittedRating(rating); 
      localStorage.setItem('movieRating', rating); 
      setError(''); 
    } else {
      setError('Please enter a valid rating before submitting.');
    }
  };

  
  const handleDelete = () => {
    setRating(0); 
    setSubmittedRating(null); 
    setError(''); 
    localStorage.removeItem('movieRating'); 
  };

  return (
    <div className="movie-rating">
      <h3>Rate this Movie</h3>
      <input
        type="number"
        min="1"
        max="10"
        value={rating === 0 ? '' : rating} 
        onChange={handleInputChange}
        placeholder="Enter a rating (1-10)"
        style={{ padding: '5px', fontSize: '16px' }}
      />
      <button 
        onClick={handleSubmit} 
        style={{
          padding: '5px 10px',
          fontSize: '16px',
          marginLeft: '10px',
          cursor: 'pointer',
        }}
      >
        Submit Rating
      </button>
      <button 
        onClick={handleDelete} 
        style={{
          padding: '5px 10px',
          fontSize: '16px',
          marginLeft: '10px',
          cursor: 'pointer',
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        Delete Rating
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误信息 */}
      
      {submittedRating !== null && (
        <p style={{ marginTop: '10px' }}>You have submitted a rating of: {submittedRating} / 10</p>
      )}
      {submittedRating === null && rating === 0 && (
        <p style={{ marginTop: '10px' }}>You have not rated this movie yet.</p>
      )}
    </div>
  );
}

export default MovieRating;
