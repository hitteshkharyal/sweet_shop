import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Box,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { deleteSweet } from "../api/sweets";

export default function SweetTable({ sweets, onEdit, onRestock, onRefresh }) {
  const remove = async id => {
    if (!window.confirm("Delete this sweet?")) return;
    await deleteSweet(id);
    onRefresh();
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FFF8F5" }}>
            <TableCell sx={{ fontWeight: 700, color: "#2C2C2C" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#2C2C2C" }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#2C2C2C" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#2C2C2C" }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#2C2C2C" }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sweets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  No sweets found. Add your first sweet!
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sweets.map((s, index) => (
              <TableRow
                key={s._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#FFF8F5",
                  "&:hover": {
                    backgroundColor: "#FFE5F0",
                    transition: "background-color 0.2s ease"
                  }
                }}
              >
                <TableCell>
                  <Typography fontWeight={600} sx={{ color: "#2C2C2C" }}>
                    {s.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={s.category}
                    size="small"
                    sx={{
                      backgroundColor: "#FFE5F0",
                      color: "#FF6B9D",
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                    sx={{
                      background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    ₹{s.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={s.quantity}
                    size="small"
                    color={s.quantity === 0 ? "error" : s.quantity < 10 ? "warning" : "success"}
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <IconButton
                      onClick={() => onEdit(s)}
                      sx={{
                        color: "#FF6B9D",
                        "&:hover": {
                          backgroundColor: "#FFE5F0",
                          transform: "scale(1.1)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => onRestock(s)}
                      sx={{
                        color: "#FFA726",
                        "&:hover": {
                          backgroundColor: "#FFF0E5",
                          transform: "scale(1.1)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      <AddIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => remove(s._id)}
                      sx={{
                        color: "#EF5350",
                        "&:hover": {
                          backgroundColor: "#FFEBEE",
                          transform: "scale(1.1)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
