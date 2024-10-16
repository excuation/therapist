import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token

        const response = await axios.get('https://therapist1.onrender.com', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        });

        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching history:', error); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User History</h2>
      {historyData.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul>
          {historyData.map((record) => (
            <li key={record._id}>
              {new Date(record.date).toLocaleString()} - {record.username} - {record.action}
              {record.therapistName && ` - Therapist: ${record.therapistName}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
