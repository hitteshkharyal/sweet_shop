import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orders";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/user")}
        sx={{ mt: 6 ,mb:6, p:2}}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" mb={2}>
        My Orders
      </Typography>

      {orders.length === 0 && (
        <Typography>No orders found</Typography>
      )}

      {orders.map(order => (
        <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">
            Order ID: {order._id}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Date: {new Date(order.createdAt).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {order.items.map((item, index) => (
            <Typography key={index}>
              {item.name} × {item.qty} — ₹{item.price}
            </Typography>
          ))}

          <Divider sx={{ my: 1 }} />

          <Typography fontWeight="bold">
            Total: ₹{order.totalAmount}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
