import { useEffect, useState } from "react";
import {
  getSweets,
  purchaseSweet
} from "../api/sweets";

import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import CartDrawer from "../components/CartDrawer";
import ReceiptDialog from "../components/ReceiptDialog";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

import useDebounce from "../hooks/useDebounce";

import {
  Grid,
  Box,
  Typography,
  Button
} from "@mui/material";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search & filter
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [category, setCategory] = useState("ALL");

  // Cart
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Receipt
  const [receipt, setReceipt] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success"
  });

  const loadSweets = async () => {
    setLoading(true);
    const res = await getSweets();
    setSweets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // Unique categories
  const categories = [
    ...new Set(sweets.map(s => s.category))
  ];

  // Filtered sweets
  const filteredSweets = sweets.filter(s => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory =
      category === "ALL" || s.category === category;

    return matchSearch && matchCategory;
  });

  // Add to cart
  const addToCart = sweet => {
    setCart(prev => {
      const found = prev.find(i => i._id === sweet._id);
      if (found) {
        return prev.map(i =>
          i._id === sweet._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...sweet, qty: 1 }];
    });

    setToast({
      open: true,
      message: "Added to cart",
      type: "success"
    });
  };

  // Remove from cart
  const removeFromCart = id => {
    setCart(cart.filter(i => i._id !== id));
  };

  // Dummy payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      for (const item of cart) {
        await purchaseSweet(item._id, item.qty);
      }

      const total = cart.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
      );

      setReceipt({
        user: localStorage.getItem("email") || "User",
        items: cart,
        total,
        date: new Date().toLocaleString()
      });

      setCart([]);
      setCartOpen(false);
      setReceiptOpen(true);

      await loadSweets();

      setToast({
        open: true,
        message: "Payment successful",
        type: "success"
      });
    } catch {
      setToast({
        open: true,
        message: "Payment failed",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
    await createOrder({
  items: cart.map(i => ({
    sweetId: i._id,
    name: i.name,
    qty: i.qty,
    price: i.price
  })),
  totalAmount: total
});

  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={8}>
            
      </Typography>

      {/* Search & Filter */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <SearchBar value={search} onChange={setSearch} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setCartOpen(true)}
          >
            Cart ({cart.length})
          </Button>
        </Grid>
      </Grid>

      {/* Loader */}
      {loading && <Loader />}

      {/* Sweet Cards */}
      <Grid container spacing={2}>
        {filteredSweets.map(s => (
          <Grid item xs={12} md={4} key={s._id}>
            <SweetCard
              sweet={s}
              onBuy={() => addToCart(s)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Cart */}
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onPay={handlePayment}
      />

      {/* Receipt */}
      <ReceiptDialog
        open={receiptOpen}
        receipt={receipt}
        onClose={() => setReceiptOpen(false)}
      />

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
}
