import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

import OrdersTable from "../components/OrdersTable";
import { getMyOrders } from "../api/orders";

export default function UserProfile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 10 }}>
      <Button
        variant="outlined"
        component={Link}
        to="/user"
        sx={{ mb: 6 }}
      >
        ← Back to Dashboard
      </Button>

      <Typography variant="h4" mb={2}>
        My Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">User Information</Typography>
        <Typography>Email: {localStorage.getItem("email")}</Typography>
      </Paper>

      <Typography variant="h6" mt={2}>
        My Orders
      </Typography>

      {loading ? (
        <Typography>Loading orders...</Typography>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Box>
  );
}
