import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSentiment('');
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/analyze`, { message});
      setSentiment(response.data.sentiment);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  }

  return (
    <div className='app'>
      <h1>Sentiment Analysis Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter your message...'
          rows='5'
          cols='50'
        />
        <br />
        <button type='Submit'>Analyze Sentiment</button>
      </form>
      {sentiment && <p>Sentiment: <strong>{sentiment}</strong></p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

    </div>
  )
}

export default App
