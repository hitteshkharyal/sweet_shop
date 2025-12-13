import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

import OrdersTable from "../components/OrdersTable";
import AnalyticsCards from "../components/AnalyticsCards";
import { getAllOrders } from "../api/orders";
import { getSweets } from "../api/sweets";

export default function AdminProfile() {
  const [orders, setOrders] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllOrders(), getSweets()])
      .then(([ordersRes, sweetsRes]) => {
        setOrders(ordersRes.data);
        setSweets(sweetsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // ===== ANALYTICS =====
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );

  const salesMap = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      salesMap[item.name] =
        (salesMap[item.name] || 0) + item.qty;
    });
  });

  const topSelling = Object.entries(salesMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  const outOfStock = sweets.filter(s => s.quantity === 0);

  return (
    <Box sx={{ p: 10 }}>
      <Button
        variant="outlined"
        component={Link}
        to="/admin"
        sx={{ mb: 6 }}
      >
        ← Back to Dashboard
      </Button>

      <Typography variant="h4" mb={2}>
        Admin Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Admin Information</Typography>
        <Typography>Role: Administrator</Typography>
      </Paper>

      {!loading && (
        <AnalyticsCards
          totalOrders={totalOrders}
          totalRevenue={totalRevenue}
          topSelling={topSelling}
          outOfStock={outOfStock}
        />
      )}

      <Typography variant="h6">
        All Orders
      </Typography>

      {loading ? (
        <Typography>Loading data...</Typography>
      ) : (
        <OrdersTable orders={orders} showUser />
      )}
    </Box>
  );
}
