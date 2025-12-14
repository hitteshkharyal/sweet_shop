import {
  Drawer,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Divider,
  Chip,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";

export default function CartDrawer({ open, cart, onClose, onRemove, onPay }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          background: "linear-gradient(135deg, #FFF8F5 0%, #FFE5F0 100%)"
        }
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)",
            color: "white"
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <ShoppingCartIcon />
              <Typography variant="h6" fontWeight={700}>
                Your Cart
              </Typography>
            </Stack>
            <IconButton onClick={onClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </Typography>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {cart.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                py: 8
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 64, color: "#FF6B9D", opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Add some sweets to get started!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {cart.map(item => (
                <Paper
                  key={item._id}
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#2C2C2C" }}>
                        {item.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price} × {item.qty}
                        </Typography>
                        <Chip
                          label={`₹${item.price * item.qty}`}
                          size="small"
                          sx={{
                            backgroundColor: "#FFE5F0",
                            color: "#FF6B9D",
                            fontWeight: 600
                          }}
                        />
                      </Stack>
                    </Box>
                    <IconButton
                      onClick={() => onRemove(item._id)}
                      sx={{
                        color: "#EF5350",
                        "&:hover": {
                          backgroundColor: "#FFEBEE",
                          transform: "scale(1.1)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {cart.length > 0 && (
          <Box
            sx={{
              p: 3,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              borderTop: "2px solid #FFE5F0"
            }}
          >
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={700} sx={{ color: "#2C2C2C" }}>
                Total:
              </Typography>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                ₹{total.toLocaleString()}
              </Typography>
            </Stack>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<PaymentIcon />}
              onClick={onPay}
              disabled={!cart.length}
              sx={{
                py: 1.5,
                background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #E91E63, #FF6F00)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(255,107,157,0.4)"
                },
                transition: "all 0.3s ease"
              }}
            >
              Pay Now
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
