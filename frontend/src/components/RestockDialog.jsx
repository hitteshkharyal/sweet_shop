import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box
} from "@mui/material";
import { restockSweet } from "../api/sweets";

export default function RestockDialog({ sweet, onClose, onSuccess }) {
  const [qty, setQty] = useState("");

  const submit = async () => {
    if (!qty || qty <= 0) return;
    await restockSweet(sweet._id, Number(qty));
    onSuccess();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Restock: {sweet.name}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Add Quantity"
            type="number"
            margin="dense"
            value={qty}
            onChange={e => setQty(e.target.value)}
          />

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={submit}
          >
            Restock
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
