import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      sx={{
        height: "90vh",
        background: "linear-gradient(135deg,#d32f2f,#f57c00)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" color="white" fontWeight="bold">
          Sweet Shop 🍬
        </Typography>

        <Typography color="white">
          Manage & purchase sweets easily

        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" font="bold" component={Link} to="/login">
            Login
          </Button>
          <Button variant="contained" component={Link} to="/register">
            Register
          </Button>
        </Stack>

        <Typography color="white">
          The Sweet Solution for the Sweets
        </Typography>

      </Stack>
    </Box>
  );
}
