import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // import useNavigate
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, AccountBox, Book, People, ExitToApp, AccountCircle, AddCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Controls the open/close state of the Drawer
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Logout function
  const handleLogout = () => {
    // Remove user data from localStorage (or sessionStorage)
    localStorage.removeItem("token"); // Remove token or any other auth data
    localStorage.removeItem("user"); // Remove user data if stored in localStorage

    // Optionally, clear any session or cookies if you're using them

    // Redirect the user to the login page after logging out
    navigate("/login");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List>
        <ListItem button component={NavLink} to="/" exact>
          <ListItemIcon>
            <Home sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="/login" exact>
          <ListItemIcon>
            <AccountBox sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={NavLink} to="/mydashboard" exact>
          <ListItemIcon>
            <AccountCircle sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="My Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/coaches" exact>
          <ListItemIcon>
            <People sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Meet The Coaches" />
        </ListItem>
        <ListItem button component={NavLink} to="/myprofile" exact>
          <ListItemIcon>
            <AccountBox sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button component={NavLink} to="/resources" exact>
          <ListItemIcon>
            <Book sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={NavLink} to="/create-account" exact>
          <ListItemIcon>
            <AddCircle sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Create An Account" />
        </ListItem>
        
        {/* Logout button with functionality */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}