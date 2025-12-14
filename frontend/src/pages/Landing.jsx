import { Box, Button, Stack, Typography, Paper, IconButton, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CakeIcon from "@mui/icons-material/Cake";
import IcecreamIcon from "@mui/icons-material/Icecream";

const carouselItems = [
  {
    title: "Delicious Sweets",
    subtitle: "Handcrafted with love",
    icon: <CakeIcon sx={{ fontSize: 60 }} />
  },
  {
    title: "Fresh Daily",
    subtitle: "Made fresh every morning",
    icon: <LocalDiningIcon sx={{ fontSize: 60 }} />
  },
  {
    title: "Sweet Treats",
    subtitle: "Satisfy your cravings",
    icon: <IcecreamIcon sx={{ fontSize: 60 }} />
  }
];

export default function Landing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)"
      }}
    >
      {/* Carousel Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: 1
        }}
      >
        {carouselItems.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: index === i ? 32 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: index === i ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)"
          }
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)"
          }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Main Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Paper
          elevation={24}
          sx={{
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            textAlign: "center",
            maxWidth: 500,
            width: "100%"
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                color: "white",
                animation: "bounce 2s infinite",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" }
                }
              }}
            >
              {carouselItems[index].icon}
            </Box>

            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                textShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              {carouselItems[index].title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.95,
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                fontWeight: 400
              }}
            >
              {carouselItems[index].subtitle}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%", mt: 1 }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/login"
                fullWidth
                sx={{
                  py: 1.2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  backgroundColor: "white",
                  color: "#FF6B9D",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#FFF8F5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.3)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/register"
                fullWidth
                sx={{
                  py: 1.2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderColor: "white",
                  borderWidth: 2,
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    borderColor: "white",
                    borderWidth: 2,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Register
              </Button>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                mt: 1,
                fontSize: { xs: "0.85rem", md: "0.9rem" }
              }}
            >
              🍬 The sweet solution for every craving 🍩
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
