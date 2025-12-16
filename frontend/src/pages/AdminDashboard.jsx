import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

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

  // Calculate analytics
  const totalSweetsWorth = sweets.reduce(
    (sum, s) => sum + (s.price || 0) * (s.quantity ?? s.initialStock ?? 0),
    0
  );

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #FFF8F5 0%, #FFE5F0 30%, #FFF0E5 100%)",
        py: 4
      }}
    >
      <Container>
        {/* Header Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)",
            color: "white",
            p: 4,
            borderRadius: 4,
            mb: 4
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <AdminPanelSettingsIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4" fontWeight={800}>
                Admin Dashboard
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your sweet shop inventory
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* You previously had AnalyticsCards here; removed total orders, top selling and out of stock cards.
            Showing total sweets worth variable is calculated (totalSweetsWorth) and can be used where needed. */}

        {/* Actions and Table */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
            mb={3}
          >
            <Typography variant="h5" fontWeight={700} sx={{ color: "#2C2C2C" }}>
              Sweet Inventory ({sweets.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedSweet(null);
                setOpenForm(true);
              }}
              sx={{
                py: 1.5,
                px: 3,
                background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #E91E63, #FF6F00)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(255,107,157,0.4)"
                },
                transition: "all 0.3s ease"
              }}
            >
              Add New Sweet
            </Button>
          </Stack>

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
        </Paper>

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
      </Container>
    </Box>
  );
}
