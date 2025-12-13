import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box
} from "@mui/material";
import { createSweet, updateSweet } from "../api/sweets";

export default function SweetForm({ sweet, onClose, onSuccess }) {
  const [form, setForm] = useState(
    sweet || { name: "", category: "", price: "", quantity: "" }
  );

  const submit = async () => {
    if (sweet) {
      await updateSweet(sweet._id, form);
    } else {
      await createSweet(form);
    }
    onSuccess();
    onClose();
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>
        {sweet ? "Update Sweet" : "Add New Sweet"}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Name"
            margin="dense"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Category"
            margin="dense"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="dense"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            margin="dense"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={submit}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
