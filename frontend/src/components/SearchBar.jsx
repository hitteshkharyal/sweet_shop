import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      placeholder="Search sweets..."
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#FF6B9D" }} />
          </InputAdornment>
        )
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.9)",
          "&:hover": {
            backgroundColor: "white"
          },
          "&.Mui-focused": {
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "#FF6B9D",
              borderWidth: 2
            }
          }
        }
      }}
    />
  );
}
