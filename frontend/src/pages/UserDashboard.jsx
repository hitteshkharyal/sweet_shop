import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api/sweets";
import SweetCard from "../components/SweetCard";
import { Grid, Typography } from "@mui/material";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);

  const load = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Typography variant="h4" mb={3}>
        Available Sweets
      </Typography>

      <Grid container spacing={2}>
        {sweets.map(s => (
          <Grid item xs={12} md={4} key={s._id}>
            <SweetCard sweet={s} onBuy={() => purchaseSweet(s._id, 1).then(load)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
