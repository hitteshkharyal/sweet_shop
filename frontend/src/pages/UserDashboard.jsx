import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Stack,
  Paper,
  IconButton,
  Chip
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

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

  const [carouselIndex, setCarouselIndex] = useState(0);

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

  useEffect(() => {
    if (sweets.length > 0) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % Math.min(sweets.length, 5));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [sweets]);

  const categories = ["ALL", ...new Set(sweets.map(s => s.category))];

  const filteredSweets = sweets.filter(s => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory =
      category === "ALL" || s.category === category;

    return matchSearch && matchCategory;
  });

  const featuredSweets = sweets.slice(0, 5);

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
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #FFF8F5 0%, #FFE5F0 30%, #FFF0E5 100%)"
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)",
          color: "white",
          py: 8,
          mb: 6
        }}
      >
        <Container>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <LocalDiningIcon sx={{ fontSize: 64 }} />
            <Typography variant="h3" fontWeight={800}>
              Welcome to Sweet Shop! 🍬
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 600 }}>
              Discover our delicious collection of handcrafted sweets
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ pb: 6 }}>
        {/* Featured Carousel */}
        {featuredSweets.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight={700} mb={3} sx={{ color: "#2C2C2C" }}>
              Featured Sweets
            </Typography>
            <Paper
              elevation={8}
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                height: 300
              }}
            >
              {featuredSweets[carouselIndex] && (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    background: `linear-gradient(135deg, rgba(255,107,157,0.9), rgba(255,167,38,0.9)), url(${featuredSweets[carouselIndex].image || "https://images.unsplash.com/photo-1601972599720-bb4dd9cbd8b3?w=1200&q=80"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,107,157,0.85), rgba(255,167,38,0.85))"
                    }
                  }}
                >
                  <Container>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={4}
                      alignItems="center"
                      sx={{ position: "relative", zIndex: 1, color: "white" }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Chip
                          label={featuredSweets[carouselIndex].category}
                          sx={{
                            mb: 2,
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 600
                          }}
                        />
                        <Typography variant="h4" fontWeight={800} mb={2}>
                          {featuredSweets[carouselIndex].name}
                        </Typography>
                        <Typography variant="h5" fontWeight={700} mb={2}>
                          ₹{featuredSweets[carouselIndex].price}
                        </Typography>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => addToCart(featuredSweets[carouselIndex])}
                          disabled={featuredSweets[carouselIndex].quantity === 0}
                          sx={{
                            backgroundColor: "white",
                            color: "#FF6B9D",
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: "#FFF8F5",
                              transform: "translateY(-2px)"
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Stack>
                  </Container>

                  {/* Carousel Controls */}
                  <IconButton
                    onClick={() => setCarouselIndex(prev => (prev - 1 + featuredSweets.length) % featuredSweets.length)}
                    sx={{
                      position: "absolute",
                      left: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      zIndex: 2,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
                    }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setCarouselIndex(prev => (prev + 1) % featuredSweets.length)}
                    sx={{
                      position: "absolute",
                      right: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      zIndex: 2,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>

                  {/* Indicators */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 1,
                      zIndex: 2
                    }}
                  >
                    {featuredSweets.map((_, i) => (
                      <Box
                        key={i}
                        onClick={() => setCarouselIndex(i)}
                        sx={{
                          width: carouselIndex === i ? 32 : 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: carouselIndex === i ? "white" : "rgba(255,255,255,0.5)",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        )}

        {/* Search and Filter Section */}
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Grid container spacing={2} alignItems="center">
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
                startIcon={<ShoppingCartIcon />}
                onClick={() => setCartOpen(true)}
                sx={{
                  py: 1.5,
                  background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
                  fontWeight: 600,
                  "&:hover": {
                    background: "linear-gradient(135deg, #E91E63, #FF6F00)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                Cart ({cart.length})
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Typography variant="h5" fontWeight={700} mb={3} sx={{ color: "#2C2C2C" }}>
          All Sweets ({filteredSweets.length})
        </Typography>

        {loading && <Loader />}

        {filteredSweets.length === 0 && !loading && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              background: "rgba(255,255,255,0.8)"
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No sweets found. Try adjusting your search or filter.
            </Typography>
          </Paper>
        )}

        <Grid container spacing={3}>
          {filteredSweets.map(s => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={s._id}>
              <SweetCard
                sweet={s}
                onBuy={() => addToCart(s)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

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
