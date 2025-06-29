import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { registerUser, loginUser } from './apiService'; // Import apiService functions

function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState('');

  const handleRegister = async () => {
    try {
      const userData = {
        username: 'testuser' + Math.floor(Math.random() * 1000),
        email: 'test' + Math.floor(Math.random() * 1000) + '@example.com',
        password: 'password123',
        role: 'volunteer',
      };
      const response = await registerUser(userData);
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setApiResponse(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email: 'test@example.com', // Use an existing user or adjust as needed
        password: 'password123',
      };
      const response = await loginUser(userData);
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setApiResponse(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="api-test-section" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h2>API Integration Test</h2>
        <button onClick={handleRegister} style={{ marginRight: '10px' }}>
          Register Test User
        </button>
        <button onClick={handleLogin}>
          Login Test User
        </button>
        {apiResponse && (
          <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', marginTop: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {apiResponse}
          </pre>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
