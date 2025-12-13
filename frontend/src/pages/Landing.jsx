import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #E53935, #FB8C00)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" color="white" fontWeight="bold">
          Sweet Shop
        </Typography>

        <Typography color="white">
          Manage & purchase sweets easily
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/login" variant="contained">
             Login
          </Button>
          <Button component={Link} to="/register" variant="Contained">
            Register
          </Button>

        </Stack>
      </Stack>
    </Box>
  );
}
