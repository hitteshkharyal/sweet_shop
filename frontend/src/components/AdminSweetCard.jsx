import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

export default function AdminSweetCard({
  sweet,
  onEdit,
  onDelete,
  onRestock
}) {
  return (
    <Card sx={{ borderLeft: "6px solid #f57c00" }}>
      <CardContent>
        <Typography variant="h6">{sweet.name}</Typography>
        <Typography color="text.secondary">
          Category: {sweet.category}
        </Typography>
        <Typography>₹ {sweet.price}</Typography>
        <Typography>
          Stock: <b>{sweet.quantity}</b>
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          <Button size="small" onClick={() => onEdit(sweet)}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(sweet)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onRestock(sweet)}
          >
            Restock
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
