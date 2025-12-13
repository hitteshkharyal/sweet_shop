import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button
} from "@mui/material";

import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import CartDrawer from "../components/CartDrawer";
import ReceiptDialog from "../components/ReceiptDialog";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

import useDebounce from "../hooks/useDebounce";

import { getSweets, purchaseSweet } from "../api/sweets";
import { createOrder } from "../api/orders";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [category, setCategory] = useState("ALL");

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [receipt, setReceipt] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

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

  const categories = ["ALL", ...new Set(sweets.map(s => s.category))];

  const filteredSweets = sweets.filter(s => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory =
      category === "ALL" || s.category === category;

    return matchSearch && matchCategory;
  });

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

  const removeFromCart = id => {
    setCart(cart.filter(i => i._id !== id));
  };

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

      await createOrder({
        items: cart.map(i => ({
          sweetId: i._id,
          name: i.name,
          qty: i.qty,
          price: i.price
        })),
        totalAmount: total
      });

      setReceipt({
        user: localStorage.getItem("email"),
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
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: "Payment failed",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={10}>
        
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <SearchBar value={search} onChange={setSearch} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CategoryFilter
            categories={categories.slice(1)}
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

      {loading && <Loader />}

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

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onPay={handlePayment}
      />

      <ReceiptDialog
        open={receiptOpen}
        receipt={receipt}
        onClose={() => setReceiptOpen(false)}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
}
