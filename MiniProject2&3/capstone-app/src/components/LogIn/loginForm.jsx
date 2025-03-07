import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    try {
      // Send login request to the backend
     const response = await axios.post(
  'http://localhost:5001/api/users/login', 
  {
    email,  // Corrected email name
    password,
  },
  {
    headers: {
      'Content-Type': 'application/json', // Add this header
    },
  }
);

      console.log("Login successful:", response.data);

      // Successful login
      const { user, token } = response.data;
      login(user, token);

      if (token) {
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
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
            value={email}
            name="email" // Make sure this matches the backend expected field
            onChange={(e) => setEmail(e.target.value)}
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