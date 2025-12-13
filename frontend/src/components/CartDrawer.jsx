import {
  Drawer,
  Typography,
  Button,
  IconButton,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartDrawer({ open, cart, onClose, onRemove, onPay }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6">Your Cart</Typography>

        {cart.map(item => (
          <Box key={item._id} sx={{ my: 1 }}>
            <Typography>
              {item.name} × {item.qty}
            </Typography>
            <IconButton onClick={() => onRemove(item._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Typography sx={{ mt: 2 }}>
          Total: ₹{total}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onPay}
          disabled={!cart.length}
        >
          Pay Now
        </Button>
      </Box>
    </Drawer>
  );
}
