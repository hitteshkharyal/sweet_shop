import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminProfile() {
  return (
    <Box sx={{ p: 10 }}>
      <Box sx={{ mb: 6 }}>
        <Button
          variant="outlined"
          component={Link}
          to="/admin"
        >
          ← Back to Dashboard
        </Button>
      </Box>

      <Typography variant="h4" mb={2}>
        Admin Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Admin Information</Typography>
        <Typography>Name: Admin</Typography>
        <Typography>Role: Administrator</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Analytics</Typography>
        <Typography color="text.secondary">
          Orders, top selling sweets, out-of-stock items will appear here
        </Typography>
      </Paper>
    </Box>
  );
}
