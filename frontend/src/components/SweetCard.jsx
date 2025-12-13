import { Card, CardContent, Typography, Button } from "@mui/material";

export default function SweetCard({ sweet, onBuy }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">{sweet.name}</Typography>
        <Typography color="text.secondary">
          Category: {sweet.category}
        </Typography>
        <Typography>Price: ₹{sweet.price}</Typography>
        <Typography>Stock: {sweet.quantity}</Typography>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          disabled={sweet.quantity === 0}
          onClick={onBuy}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Buy"}
        </Button>
      </CardContent>
    </Card>
  );
}
