import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        background: "#f5f5f5"
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Sweet Shop
      </Typography>
    </Box>
  );
}
