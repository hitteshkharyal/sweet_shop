import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserProfile() {
  return (
    <Box sx={{ p: 10 }}>
      <Box sx={{ mb: 6 }}>
        <Button
          variant="outlined"
          component={Link}
          to="/user"
        >
          ← Back to Dashboard
        </Button>
      </Box>

      <Typography variant="h4" mb={2}>
        My Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">User Information</Typography>
        <Typography>Name: (from backend)</Typography>
        <Typography>Email: (from backend)</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">My Orders</Typography>
        <Typography color="text.secondary">
          Orders table will appear here
        </Typography>
      </Paper>
    </Box>
  );
}
