import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {sweets.map(s => (
          <TableRow key={s._id}>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.category}</TableCell>
            <TableCell>₹{s.price}</TableCell>
            <TableCell>{s.quantity}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(s)}>
                <EditIcon />
              </IconButton>

              <IconButton color="primary" onClick={() => onRestock(s)}>
                <AddIcon />
              </IconButton>

              <IconButton color="error" onClick={() => remove(s._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
