import { useState } from "react";
import { login } from "../api/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await login({
        email,
        password,
        role
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      window.location.href =
        res.data.role === "admin" ? "/admin" : "/user";
    } catch (err) {
      setError("Invalid email, password or role");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2} textAlign="center">
        Login
      </Typography>

      <ToggleButtonGroup
        fullWidth
        exclusive
        value={role}
        onChange={(_, v) => v && setRole(v)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="user">User</ToggleButton>
        <ToggleButton value="admin">Admin</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={submit}
      >
        Login
      </Button>
    </Box>
  );
}
