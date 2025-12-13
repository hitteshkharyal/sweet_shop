import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <CircularProgress />
    </Box>
  );
}
