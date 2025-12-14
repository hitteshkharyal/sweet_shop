import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="category-filter-label">Category</InputLabel>
      <Select
        labelId="category-filter-label"
        label="Category"
        value={value}
        onChange={e => onChange(e.target.value)}
        startAdornment={<CategoryIcon sx={{ mr: 1, color: "#FF6B9D" }} />}
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          "&:hover": {
            backgroundColor: "white"
          },
          "&.Mui-focused": {
            backgroundColor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FF6B9D",
              borderWidth: 2
            }
          }
        }}
      >
        <MenuItem value="ALL">All Categories</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
