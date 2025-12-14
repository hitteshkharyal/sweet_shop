import { AppBar, Toolbar, Button, Typography, Box, Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../store/authStore";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = auth.isLoggedIn();
  const isAdmin = auth.isAdmin();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "white",
            flexGrow: 1
          }}
        >
          <LocalDiningIcon sx={{ fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg, #FFFFFF, #FFF8F5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Sweet Shop
          </Typography>
        </Box>

        {!isLoggedIn ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "white",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* <Button
              component={Link}
              to={isAdmin ? "/admin" : "/user"}
              startIcon={<DashboardIcon />}
              sx={{
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Dashboard
            </Button> */}
            <Button
              component={Link}
              to={isAdmin ? "/admin/profile" : "/profile"}
              startIcon={<PersonIcon />}
              sx={{
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                auth.logout();
                window.location.href = "/";
              }}
              startIcon={<LogoutIcon />}
              sx={{
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
