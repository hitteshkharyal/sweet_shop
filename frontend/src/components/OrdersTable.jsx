import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from "@mui/material";

export default function OrdersTable({ orders, showUser = false }) {
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
            {showUser && <TableCell>User</TableCell>}
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              {showUser && (
                <TableCell>
                  {order.userId?.email}
                </TableCell>
              )}

              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>

              <TableCell>
                {order.items.map(item => (
                  <div key={item.sweetId}>
                    {item.name} × {item.qty}
                  </div>
                ))}
              </TableCell>

              <TableCell>
                ₹{order.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
