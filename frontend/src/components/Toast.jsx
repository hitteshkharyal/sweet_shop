import { Snackbar, Alert } from "@mui/material";

export default function Toast({ open, message, type, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}
