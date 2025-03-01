import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
  const { login } = useContext(UserContext); // Use login function
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        userEmail,
        password,
      });
      console.log("login successful:", response.data);

      // Successful login
      const { user, token } = response.data;
      if (token) {
        setUser(user);  // Set the user info
        setToken(token); // Store token for API requests
        setIsAuthenticated(true); // Update UI state

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
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