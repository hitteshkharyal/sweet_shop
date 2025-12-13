import { FormControl, MenuItem, Select } from "@mui/material";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <FormControl fullWidth>
      <Select value={value} onChange={e => onChange(e.target.value)}>
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
