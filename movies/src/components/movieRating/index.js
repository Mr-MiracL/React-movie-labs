// MovieRatings.js
import React, { useState, useEffect } from 'react';

function MovieRating() {
  const [rating, setRating] = useState(0); // 当前评分
  const [error, setError] = useState(''); // 错误信息
  const [submittedRating, setSubmittedRating] = useState(null); // 提交的评分

  // 从 localStorage 获取评分（如果有的话）
  useEffect(() => {
    const savedRating = localStorage.getItem('movieRating');
    if (savedRating) {
      setSubmittedRating(savedRating); // 设置已保存的评分
      setRating(savedRating); // 设置当前评分
    }
  }, []);

  // 处理输入框变化
  const handleInputChange = (e) => {
    const value = e.target.value;

    // 验证输入值是否为 1 到 5 之间的数字
    if (value >= 1 && value <= 5) {
      setRating(value);
      setError(''); // 清除错误信息
    } else if (value === '') {
      setRating(0); // 如果输入框为空，则不显示评分
      setError('');
    } else {
      setError('Please enter a rating between 1 and 5.');
    }
  };

  // 提交评分
  const handleSubmit = () => {
    if (rating >= 1 && rating <= 5) {
      setSubmittedRating(rating); // 提交评分
      localStorage.setItem('movieRating', rating); // 将评分保存到 localStorage
      setError(''); // 清除错误信息
    } else {
      setError('Please enter a valid rating before submitting.');
    }
  };

  // 删除评分
  const handleDelete = () => {
    setRating(0); // 清除当前评分
    setSubmittedRating(null); // 清除提交的评分
    setError(''); // 清除错误信息
    localStorage.removeItem('movieRating'); // 从 localStorage 删除评分
  };

  return (
    <div className="movie-rating">
      <h3>Rate this Movie</h3>
      <input
        type="number"
        min="1"
        max="5"
        value={rating === 0 ? '' : rating} // 如果没有评分，输入框为空
        onChange={handleInputChange}
        placeholder="Enter a rating (1-5)"
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
        <p style={{ marginTop: '10px' }}>You have submitted a rating of: {submittedRating} / 5</p>
      )}
      {submittedRating === null && rating === 0 && (
        <p style={{ marginTop: '10px' }}>You have not rated this movie yet.</p>
      )}
    </div>
  );
}

export default MovieRating;
