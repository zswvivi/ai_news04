import React from 'react';

const NewsCard = ({ title, content, source, date, url, image }) => {
  return (
    <div className="news-card">
      <div className="news-image-container">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img 
            src={image || '/images/default-ai.jpg'} 
            alt={title}
            className="news-image"
            onError={(e) => {e.target.src = '/images/default-ai.jpg'}}
          />
        </a>
      </div>
      <div className="news-content-container">
        <a href={url} target="_blank" rel="noopener noreferrer" className="news-title-link">
          <h2 className="news-title">{title}</h2>
        </a>
        <p className="news-source">{source}</p>
        <p className="news-content">{content}</p>
        <p className="news-date">{date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
