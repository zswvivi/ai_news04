import React from 'react';

const NewsCard = ({ title, content, source, date, url }) => {
  return (
    <div className="news-card">
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-title-link">
        <h2 className="news-title">{title}</h2>
      </a>
      <p className="news-source">{source}</p>
      <p className="news-content">{content}</p>
      <p className="news-date">{date}</p>
    </div>
  );
};

export default NewsCard;
