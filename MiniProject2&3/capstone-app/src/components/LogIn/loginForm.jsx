import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context"; // Use the updated AuthContext

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth(); // Get both login and isAuthenticated from context
  const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

  try {
      await login(email, password); // Calls the login function in AuthContext
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    }
  };

  // Watch for authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mydashboard"); // Navigate to dashboard when user is authenticated
    }
  }, [isAuthenticated, navigate]); // Dependency on isAuthenticated
  

  return (
    <div className="login page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            name="email"
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;