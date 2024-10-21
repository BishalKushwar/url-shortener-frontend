// src/components/UrlShortener.js
import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/shorten', {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <div>
          <h2>Your Shortened URL:</h2>
          <a href={`http://localhost:5000/${shortUrl}`} target="_blank" rel="noopener noreferrer">
            http://localhost:5000/{shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
