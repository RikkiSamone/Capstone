import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext); // Access UserContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5001/api/login', {
        email: userEmail,
        password: password,
      });

      // Successful login
      const { user, token } = response.data;

      // Save the user details in context
      setUser({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token, // Optional: You might use this token for authentication
      });

      // Redirect to the dashboard
      navigate('/mydashboard');
    } catch (err) {
      // Handle error (e.g., invalid credentials)
      setError(err.response?.data?.error || 'Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={userEmail}
            name="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Log In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;