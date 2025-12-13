import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 2,
        textAlign: "center",
        background: "#212121",
        color: "#fff"
      }}
    >
      <Typography variant="body2">
        © 2025 Sweet Shop Management System
      </Typography>
    </Box>
  );
}
