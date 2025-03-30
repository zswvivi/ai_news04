import { fetchExternalNews } from '../../utils/news_service';

export default async function handler(req, res) {
  try {
    // Fetch news using the JavaScript service instead of Python script
    const newsItems = await fetchExternalNews();
    
    // Return the news items as JSON
    res.status(200).json(newsItems);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
