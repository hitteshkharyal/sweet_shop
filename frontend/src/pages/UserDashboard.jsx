import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api/sweets";
import SweetCard from "../components/SweetCard";
import { Grid, Typography } from "@mui/material";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);

  const load = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  const buy = async id => {
    await purchaseSweet(id, 1);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Typography variant="h4" mb={3}>Sweets</Typography>
      <Grid container spacing={2}>
        {sweets.map(s => (
          <Grid item xs={12} md={4} key={s._id}>
            <SweetCard sweet={s} onBuy={buy} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
