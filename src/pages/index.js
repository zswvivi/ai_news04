import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    }
    
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data);
      setFilteredNews(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchNews();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchNews(true);
    }, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [fetchNews]);

  const handleRefresh = () => {
    fetchNews(true);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredNews(news);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = news.filter(item => 
      item.title.toLowerCase().includes(term) || 
      item.content.toLowerCase().includes(term) ||
      item.source.toLowerCase().includes(term)
    );
    
    setFilteredNews(filtered);
  };

  return (
    <div>
      <Head>
        <title>AI News Hub</title>
        <meta name="description" content="Latest AI news from around the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="main">
        <div className="container">
          <div className="refresh-container">
            <SearchBar onSearch={handleSearch} />
            <button 
              className="refresh-button" 
              onClick={handleRefresh} 
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh News'}
            </button>
            {lastUpdated && (
              <p className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="news-grid">
              {filteredNews.length > 0 ? (
                filteredNews.map((item, index) => (
                  <NewsCard 
                    key={index}
                    title={item.title}
                    content={item.content}
                    source={item.source}
                    date={item.date}
                    url={item.url}
                  />
                ))
              ) : (
                <div className="empty-message">
                  <p>No news matching your search. Try different keywords.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
