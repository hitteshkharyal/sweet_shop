import { useState } from "react";
import { login } from "../api/auth";
import { auth } from "../store/authStore";
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

export default function Login() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await login(form);

      if (res.data.role !== role) {
        setError("Role mismatch. Please select correct role.");
        return;
      }

      auth.login(res.data.token, res.data.role);
      window.location.href = role === "admin" ? "/admin" : "/user";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2} textAlign="center">
        Login
      </Typography>

      <ToggleButtonGroup
        fullWidth
        value={role}
        exclusive
        onChange={(_, val) => val && setRole(val)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="user">User</ToggleButton>
        <ToggleButton value="admin">Admin</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={submit}>
        Login
      </Button>
      
    <Typography margin="2px" color="white" bgcolor="black" align="center" fontSize={14}>
  Admin Login → admin@sweetshop.com / admin123
</Typography>

    </Box>
  );
}
