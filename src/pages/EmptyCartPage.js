import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { theme } from "../theme";
import { Link } from "react-router-dom";

const EmptyCartPage = () => {
  return (
    <Grid container display="flex" justifyContent="center" sx={{ mt: 5 }}>
      <Grid
        item
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={5}
      >
        <Typography variant="h2" fontWeight={700}>
          Your Shopping Cart is Empty
        </Typography>
        <Typography variant="h4">Please add more books to your cart</Typography>
        <Grid item display="flex" gap={2}>
          <Link to="/signin">
            <Button
              sx={{
                textTransform: "none",
                color: theme.palette.primary.main,
                boxShadow: "none",
                "&:hover": { opacity: 0.75 },
                borderRadius: 0,
                pl: 20,
                pr: 20,
                pt: 2,
                pb: 2,
              }}
              variant="outlined"
              fullWidth
            >
              <Typography variant="h4">Sign in</Typography>
            </Button>
          </Link>
          <Link to="/">
            <Button
              sx={{
                textTransform: "none",
                pl: 14,
                pr: 14,
                pt: 2,
                pb: 2,
                color: theme.palette.primary.main,
                boxShadow: "none",
                "&:hover": { opacity: 0.75, background: "#222" },
                borderRadius: 0,
                background: "#222",
              }}
              variant="outlined"
              fullWidth
            >
              <Typography variant="h4" color="white">
                Continue Shopping
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmptyCartPage;