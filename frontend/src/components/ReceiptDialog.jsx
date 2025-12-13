import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button
} from "@mui/material";

export default function ReceiptDialog({ open, receipt, onClose }) {
  if (!receipt) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Successful</DialogTitle>
      <DialogContent>
        <Typography>User: {receipt.user}</Typography>

        {receipt.items.map(item => (
          <Typography key={item._id}>
            {item.name} × {item.qty}
          </Typography>
        ))}

        <Typography sx={{ mt: 1 }}>
          Total Paid: ₹{receipt.total}
        </Typography>

        <Button sx={{ mt: 2 }} onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
