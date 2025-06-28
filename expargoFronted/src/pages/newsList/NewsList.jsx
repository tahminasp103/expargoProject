import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/news', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setNewsList(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Xəbərlər alınarkən xəta:', error);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Yüklənir...</div>;

  if (!Array.isArray(newsList) || newsList.length === 0) {
    return <div>Heç bir xəbər yoxdur</div>;
  }

  return (
    <div>
      <h1>📰 Xəbərlər</h1>
      {newsList.map((newsItem, index) => (
        <div key={index}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default NewsList;
