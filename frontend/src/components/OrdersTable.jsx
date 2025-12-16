import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Stack
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/**
 * OrdersTable
 *
 * - On larger screens renders a normal MUI Table.
 * - On small screens (down('sm')) renders a simple slider/carousel:
 *   shows one order per "slide" with prev/next controls.
 *
 * This keeps the UI responsive without adding external dependencies.
 */
export default function OrdersTable({ orders = [], showUser = false }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0);

  if (!orders || !orders.length) {
    return (
      <Typography color="text.secondary">
        No orders found
      </Typography>
    );
  }

  // Slider handlers for mobile view
  const handlePrev = () => {
    setIndex((prev) => (prev <= 0 ? orders.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev >= orders.length - 1 ? 0 : prev + 1));
  };

  if (isMobile) {
    const order = orders[index];

    return (
      <Box sx={{ mt: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Box>
                {showUser && (
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {order.userId?.email || "—"}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {new Date(order.createdAt).toLocaleString()}
                </Typography>

                <Box sx={{ mb: 1 }}>
                  {order.items.map((item) => (
                    <Typography variant="body2" key={item.sweetId}>
                      {item.name} × {item.qty}
                    </Typography>
                  ))}
                </Box>

                <Typography variant="subtitle1">₹{order.totalAmount}</Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton aria-label="previous order" size="small" onClick={handlePrev}>
                  <ChevronLeftIcon />
                </IconButton>

                <Typography variant="caption" color="text.secondary">
                  {index + 1} / {orders.length}
                </Typography>

                <IconButton aria-label="next order" size="small" onClick={handleNext}>
                  <ChevronRightIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Desktop / larger screens: regular table (horizontally scrollable if needed)
  return (
    <Paper sx={{ mt: 2, overflowX: "auto" }}>
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
          {orders.map((order) => (
            <TableRow key={order._id}>
              {showUser && (
                <TableCell>
                  {order.userId?.email || "—"}
                </TableCell>
              )}

              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>

              <TableCell>
                {order.items.map((item) => (
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
