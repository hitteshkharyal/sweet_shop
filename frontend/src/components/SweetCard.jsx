import { Card, CardContent, Button, Typography } from "@mui/material";

export default function SweetCard({ sweet, onBuy }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{sweet.name}</Typography>
        <Typography>₹{sweet.price}</Typography>
        <Typography>Stock: {sweet.quantity}</Typography>
        <Button
          disabled={sweet.quantity === 0}
          onClick={() => onBuy(sweet._id)}
        >
          Buy
        </Button>
      </CardContent>
    </Card>
  );
}
