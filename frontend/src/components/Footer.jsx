import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ mt: 5, py: 2, background: "#212121", color: "white", textAlign: "center" }}>
      <Typography variant="body2">
        © 2025 Sweet Shop Management System
      </Typography>
    </Box>
  );
}
