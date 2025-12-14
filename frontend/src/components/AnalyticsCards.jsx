import { Grid, Paper, Typography, Box, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";

export default function AnalyticsCards({
  totalOrders,
  totalRevenue,
  topSelling,
  outOfStock
}) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #FF6B9D, #FFB3D1)",
      bgColor: "#FFE5F0"
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #FFA726, #FFD54F)",
      bgColor: "#FFF0E5"
    },
    {
      title: "Top Selling",
      value: topSelling.length > 0 ? topSelling[0]?.name || "N/A" : "N/A",
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #BA68C8, #E1BEE7)",
      bgColor: "#F3E5F5"
    },
    {
      title: "Out of Stock",
      value: outOfStock.length,
      icon: <WarningIcon sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #EF5350, #EF9A9A)",
      bgColor: "#FFEBEE"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              border: `2px solid ${card.bgColor}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)"
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  background: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }}
              >
                {card.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ mb: 0.5 }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    background: card.color,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
