import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from "@mui/material";

export default function OrdersTable({ orders }) {
  if (!orders.length) {
    return (
      <Typography color="text.secondary">
        No orders found
      </Typography>
    );
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {order.items.map(item => (
                  <div key={item.sweetId}>
                    {item.name} × {item.qty}
                  </div>
                ))}
              </TableCell>

              <TableCell>₹{order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
