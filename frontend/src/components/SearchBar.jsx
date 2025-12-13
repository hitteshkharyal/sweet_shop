import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      placeholder="Search sweets..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
