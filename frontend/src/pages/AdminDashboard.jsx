import { useEffect, useState } from "react";
import {
  getAllSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  restockSweet
} from "../api/adminSweets";

import AdminSweetCard from "../components/AdminSweetCard";
import SweetFormDialog from "../components/SweetFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

import { Grid, Button, Typography } from "@mui/material";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = async () => {
    const res = await getAllSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const saveSweet = async data => {
    if (selected) {
      await updateSweet(selected._id, data);
    } else {
      await addSweet(data);
    }
    setFormOpen(false);
    setSelected(null);
    load();
  };

  const confirmDelete = async () => {
    await deleteSweet(selected._id);
    setConfirmOpen(false);
    setSelected(null);
    load();
  };

  const restock = async sweet => {
    const qty = prompt("Enter restock quantity:");
    if (qty > 0) {
      await restockSweet(sweet._id, Number(qty));
      load();
    }
  };

  return (
    <>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setFormOpen(true)}
      >
        Add Sweet
      </Button>

      <Grid container spacing={2}>
        {sweets.map(s => (
          <Grid item xs={12} md={4} key={s._id}>
            <AdminSweetCard
              sweet={s}
              onEdit={sweet => {
                setSelected(sweet);
                setFormOpen(true);
              }}
              onDelete={sweet => {
                setSelected(sweet);
                setConfirmOpen(true);
              }}
              onRestock={restock}
            />
          </Grid>
        ))}
      </Grid>

      <SweetFormDialog
        open={formOpen}
        initial={selected}
        onClose={() => {
          setFormOpen(false);
          setSelected(null);
        }}
        onSave={saveSweet}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this sweet?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
