import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../store/authStore";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg,#d32f2f,#f57c00)" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          🍬 Sweet Shop
        </Typography>

        {!auth.isLoggedIn() && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}

        {auth.isLoggedIn() && (
          <>
            <Button
              color="inherit"
              component={Link}
              to={auth.isAdmin() ? "/admin" : "/user"}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                auth.logout();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
