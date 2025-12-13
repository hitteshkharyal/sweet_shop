import { Grid, Paper, Typography } from "@mui/material";

export default function AnalyticsCards({
  totalOrders,
  totalRevenue,
  topSelling,
  outOfStock
}) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Orders</Typography>
          <Typography>{totalOrders}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography>₹{totalRevenue}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Top Selling</Typography>
          {topSelling.map(item => (
            <Typography key={item.name}>
              {item.name} ({item.qty})
            </Typography>
          ))}
        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Out of Stock</Typography>
          {outOfStock.map(s => (
            <Typography key={s._id}>{s.name}</Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
