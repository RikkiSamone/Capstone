import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';


function LoginForm() {
    // input state values always need to be strings - empty initially
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        //Demo Login
        const demoUsername = "admin";
        const demoPassword = "password123";

        if (username === demoUsername && password === demoPassword) {
            setUser({ username }); // Update the user context
            navigate("/dashboard"); // Redirect to the dashboard
        } else {
            setError("Invalid username or password.");
        }
    };


    return (
        <div className="login page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email Address:</label>
                    <input type="email"
                        value={userEmail}
                        name="userEmail"
                        onChange={(e) => setUserEmail(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
       
                <button type="submit">Log In</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm