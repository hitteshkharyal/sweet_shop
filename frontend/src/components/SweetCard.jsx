import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box
} from "@mui/material";

export default function SweetCard({ sweet, onBuy }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{sweet.name}</Typography>

        <Chip
          label={sweet.category}
          size="small"
          color="secondary"
          sx={{ my: 1 }}
        />

        <Typography>₹{sweet.price}</Typography>

        <Typography color="text.secondary">
          Stock: {sweet.quantity}
        </Typography>
      </CardContent>

      <Box p={2}>
        <Button
          fullWidth
          variant="contained"
          disabled={sweet.quantity === 0}
          onClick={() => onBuy(sweet)}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Box>
    </Card>
  );
}
