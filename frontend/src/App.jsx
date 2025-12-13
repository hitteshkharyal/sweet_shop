import { Box, Typography, Button } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #E53935, #FB8C00)"
      }}
    >
      <Typography variant="h3" color="#fff" fontWeight="bold">
        Sweet Shop
      </Typography>

      <Typography color="#fff" sx={{ mt: 1, mb: 3 }}>
        Manage sweets • Track inventory • Boost sales
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        sx={{ borderRadius: "30px", px: 4 }}
      >
        Get Started
      </Button>
    </Box>
  );
}
