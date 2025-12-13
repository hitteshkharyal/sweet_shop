import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useState, useEffect } from "react";

export default function SweetFormDialog({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const submit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initial ? "Edit Sweet" : "Add New Sweet"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Category"
          fullWidth
          margin="dense"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="dense"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="dense"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
