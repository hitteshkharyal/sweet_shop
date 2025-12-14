import { useState } from "react";
import { login } from "../api/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Container,
  Stack
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

export default function Login() {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success"
  });

  const submit = async () => {
    if (!email || !password) {
      setToast({
        open: true,
        message: "Please fill in all fields",
        type: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const res = await login({
        email,
        password,
        role
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setToast({
        open: true,
        message: "Login successful! Redirecting...",
        type: "success"
      });

      setTimeout(() => {
        window.location.href =
          res.data.role === "admin" ? "/admin" : "/user";
      }, 1000);
    } catch (err) {
      setToast({
        open: true,
        message: "Invalid email, password or role",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #FFF8F5 0%, #FFE5F0 50%, #FFF0E5 100%)",
        display: "flex",
        alignItems: "center",
        py: 8
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Stack spacing={2.5} alignItems="center">
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LocalDiningIcon sx={{ fontSize: 30, color: "white" }} />
            </Box>

            <Typography variant="h5" fontWeight={800} textAlign="center">
              Welcome Back!
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Sign in to continue
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              adminlogin- admin@sweetshop.com | password- admin123
              <br />
              userlogin-hiteshkharyal@gmail.com | password- abc123
            </Typography>

            <ToggleButtonGroup
              fullWidth
              exclusive
              value={role}
              onChange={(_, v) => v && setRole(v)}
              sx={{
                mt: 1,
                "& .MuiToggleButton-root": {
                  py: 1,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E91E63, #FF6F00)"
                    }
                  }
                }
              }}
            >
              <ToggleButton value="user" startIcon={<PersonIcon sx={{ fontSize: 18 }} />}>
                User
              </ToggleButton>
              <ToggleButton value="admin" startIcon={<AdminPanelSettingsIcon sx={{ fontSize: 18 }} />}>
                Admin
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField
              fullWidth
              label="Email"
              type="email"
              size="small"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFF8F5"
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              size="small"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFF8F5"
                }
              }}
            />

            {loading && <Loader />}

            <Button
              fullWidth
              variant="contained"
              onClick={submit}
              disabled={loading}
              sx={{
                py: 1,
                mt: 1,
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                "&:hover": {
                  background: "linear-gradient(135deg, #E91E63, #FF6F00)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(255,107,157,0.4)"
                },
                "&:disabled": {
                  background: "linear-gradient(135deg, #FFB3D1, #FFD54F)",
                  opacity: 0.7
                },
                transition: "all 0.3s ease"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
}
