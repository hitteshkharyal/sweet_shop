import { useState } from "react";
import { register } from "../api/auth";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState("");

  const submit = async () => {
    await register(form);
    setSuccess("Registration successful! Please login.");
    setTimeout(() => (window.location.href = "/login"), 1500);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <TextField fullWidth label="Name" margin="normal"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <TextField fullWidth label="Email" margin="normal"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <TextField fullWidth label="Password" type="password" margin="normal"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {success && (
        <Typography color="success.main" mt={1}>
          {success}
        </Typography>
      )}

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={submit}>
        Register
      </Button>
    </Box>
  );
}
