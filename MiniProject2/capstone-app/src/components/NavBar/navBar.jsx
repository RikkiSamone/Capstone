import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyThemeContext } from '../../context/themeContext'


export default function NavBar() {
const {theme} = useContext(MyThemeContext);

return (
    <nav className="NavBar"
        style={{backgroundColor: theme.background, color: theme.foreground}}>
        <ul className="menu">
                   
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/mydashboard">My Dashboard</NavLink></li>
                    <li><NavLink to="/coaches">Meet The Coaches</NavLink></li>
                    <li><NavLink to="/create-account">Create An Account</NavLink></li>
            
                   
            
            </ul> {/* ++ Add another page with route and component */}
    </nav>
)
}