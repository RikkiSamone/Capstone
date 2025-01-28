import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/themeContext"; // Import your custom theme hook

export default function NavBar() {
  const { theme } = useTheme(); // Call useTheme directly

  return (
    <nav className="NavBar">
      <ul className="menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/mydashboard">My Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/coaches">Meet The Coaches</NavLink>
        </li>
        <li>
          <NavLink to="/create-account">Create An Account</NavLink>
        </li>
      </ul>
    </nav>
  );
}