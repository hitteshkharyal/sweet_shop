import { Box, Typography, Container, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: "linear-gradient(135deg, #FF6B9D 0%, #FFA726 100%)",
        color: "white",
        pt: 5,
        pb: 3
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocalDiningIcon sx={{ fontSize: 32 }} />
              <Typography variant="h5" fontWeight={800}>
                Sweet Shop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Your one-stop destination for delicious, handcrafted sweets. 
              Made with love, delivered with care.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" sx={{ color: "white", opacity: 0.9, "&:hover": { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/user" sx={{ color: "white", opacity: 0.9, "&:hover": { opacity: 1 } }}>
                Shop
              </Link>
              <Link href="/login" sx={{ color: "white", opacity: 0.9, "&:hover": { opacity: 1 } }}>
                Login
              </Link>
              <Link href="/register" sx={{ color: "white", opacity: 0.9, "&:hover": { opacity: 1 } }}>
                Register
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              📍 123 Sweet Street, Candy City
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              📞 +9178765864**
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              ✉️ hiteshkharyal@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center"
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Sweet Shop
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
