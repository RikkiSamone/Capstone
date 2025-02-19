import React, { useState } from "react";
import { useCoachAdmin } from "../../context/coachAdminContext";

const CoachLogin = () => {
  const { loginCoach } = useCoachAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCoach({ email, password });
  };

  return (
    <div>
      <h1>Coach Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CoachLogin;
