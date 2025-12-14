import { useState } from "react";
import { register } from "../api/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Stack
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success"
  });

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      setToast({
        open: true,
        message: "Please fix the errors in the form",
        type: "error"
      });
      return;
    }

    setLoading(true);
    try {
      await register(form);
      setToast({
        open: true,
        message: "Registration successful! Redirecting...",
        type: "success"
      });
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Registration failed. Please try again.",
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
          <Stack spacing={2.5}>
            <Stack spacing={1.5} alignItems="center">
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
                <PersonAddIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>

              <Typography variant="h5" fontWeight={800} textAlign="center">
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Join Sweet Shop today!
              </Typography>
            </Stack>

            <TextField
              fullWidth
              label="Full Name"
              size="small"
              value={form.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFF8F5"
                }
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              size="small"
              value={form.email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
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
              value={form.password}
              error={!!errors.password}
              helperText={errors.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
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
              startIcon={!loading && <LocalDiningIcon sx={{ fontSize: 18 }} />}
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
              {loading ? "Registering..." : "Register"}
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
