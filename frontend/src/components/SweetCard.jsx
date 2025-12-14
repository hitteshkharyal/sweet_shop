import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  CardMedia,
  Stack
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

// Generate sweet images based on category/name
const getSweetImage = (sweet) => {
  const images = {
    chocolate: "https://images.unsplash.com/photo-1606312619070-d48c4f3397b4?w=400&q=80",
    candy: "https://images.unsplash.com/photo-1601972599720-bb4dd9cbd8b3?w=400&q=80",
    cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    cookie: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
    icecream: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
    donut: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80"
  };
  
  const category = sweet.category?.toLowerCase() || "";
  const name = sweet.name?.toLowerCase() || "";
  
  for (const [key, url] of Object.entries(images)) {
    if (category.includes(key) || name.includes(key)) {
      return url;
    }
  }
  
  return "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=https://images.unsplash.com/photo-1543773495-2cd9248a5bda?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D400&q=80";
};

export default function SweetCard({ sweet, onBuy }) {
  const isOutOfStock = sweet.quantity === 0;
  const imageUrl = getSweetImage(sweet);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        border: isOutOfStock ? "2px solid #E0E0E0" : "none"
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          backgroundColor: "#FFF8F5"
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={sweet.name}
          sx={{
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)"
            },
            opacity: isOutOfStock ? 0.5 : 1
          }}
        />
        {isOutOfStock && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: "0.75rem",
              fontWeight: 600
            }}
          >
            Out of Stock
          </Box>
        )}
        <Chip
          label={sweet.category}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "rgba(255,107,157,0.9)",
            color: "white",
            fontWeight: 600,
            backdropFilter: "blur(10px)"
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 1, color: "#2C2C2C" }}
        >
          {sweet.name}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: "linear-gradient(135deg, #FF6B9D, #FFA726)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            ₹{sweet.price}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "#FFF8F5",
            mb: 2
          }}
        >
          <InventoryIcon sx={{ fontSize: 18, color: "#FF6B9D" }} />
          <Typography variant="body2" color="text.secondary">
            Stock: {sweet.quantity} {sweet.quantity === 1 ? "item" : "items"}
          </Typography>
        </Stack>
      </CardContent>

      <Box p={2} pt={0}>
        <Button
          fullWidth
          variant="contained"
          disabled={isOutOfStock}
          onClick={() => onBuy(sweet)}
          startIcon={<ShoppingCartIcon />}
          sx={{
            py: 1.5,
            fontWeight: 600,
            background: isOutOfStock
              ? "#E0E0E0"
              : "linear-gradient(135deg, #FF6B9D, #FFA726)",
            color: isOutOfStock ? "#9E9E9E" : "white",
            "&:hover": {
              background: isOutOfStock
                ? "#E0E0E0"
                : "linear-gradient(135deg, #E91E63, #FF6F00)",
              transform: isOutOfStock ? "none" : "translateY(-2px)",
              boxShadow: isOutOfStock
                ? "none"
                : "0 8px 24px rgba(255,107,157,0.4)"
            },
            transition: "all 0.3s ease"
          }}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Box>
    </Card>
  );
}
