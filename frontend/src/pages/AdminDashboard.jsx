import { useEffect, useState } from "react";
import { getSweets } from "../api/sweets";
import SweetTable from "../components/SweetTable";
import SweetForm from "../components/SweetForm";
import RestockDialog from "../components/RestockDialog";
import { Box, Button, Typography } from "@mui/material";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openRestock, setOpenRestock] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

  const load = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Dashboard</Typography>

      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={() => {
          setSelectedSweet(null);
          setOpenForm(true);
        }}
      >
        + Add Sweet
      </Button>

      <SweetTable
        sweets={sweets}
        onEdit={sweet => {
          setSelectedSweet(sweet);
          setOpenForm(true);
        }}
        onRestock={sweet => {
          setSelectedSweet(sweet);
          setOpenRestock(true);
        }}
        onRefresh={load}
      />

      {openForm && (
        <SweetForm
          sweet={selectedSweet}
          onClose={() => setOpenForm(false)}
          onSuccess={load}
        />
      )}

      {openRestock && selectedSweet && (
        <RestockDialog
          sweet={selectedSweet}
          onClose={() => setOpenRestock(false)}
          onSuccess={load}
        />
      )}
    </Box>
  );
}
