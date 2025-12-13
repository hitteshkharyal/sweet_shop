import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from "@mui/material";

export default function ConfirmDialog({ open, title, onConfirm, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
