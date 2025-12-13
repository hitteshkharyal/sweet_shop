import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button
} from "@mui/material";

import SweetTable from "../components/SweetTable";
import SweetForm from "../components/SweetForm";
import RestockDialog from "../components/RestockDialog";

import { getSweets } from "../api/sweets";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openRestock, setOpenRestock] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

  const loadSweets = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Admin Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
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
        onRefresh={loadSweets}
      />

      {openForm && (
        <SweetForm
          sweet={selectedSweet}
          onClose={() => setOpenForm(false)}
          onSuccess={loadSweets}
        />
      )}

      {openRestock && selectedSweet && (
        <RestockDialog
          sweet={selectedSweet}
          onClose={() => setOpenRestock(false)}
          onSuccess={loadSweets}
        />
      )}
    </Box>
  );
}
