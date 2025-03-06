import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout } from "../../firebase";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // Ensure we fetch the latest profile data
        setUser({ ...currentUser, photoURL: currentUser.photoURL || "/default-avatar.png" });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      handleClose();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <button className="px-5 py-2.5 bg-gray-400 text-gray-600 rounded-lg shadow-md" disabled>
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user.photoURL} sx={{ width: 40, height: 40 }}>
                {user.displayName?.charAt(0) || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar src={user.photoURL} />
            {user.displayName || "User"}
          </MenuItem>
          <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
            <Avatar /> My dashboard
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to="/register" onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
    >
      Sign In
    </button>
  );
}
