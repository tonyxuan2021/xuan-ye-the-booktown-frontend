import { Button, Divider, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CartContext from "../CartContext";
import Loader from "../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY_NYT = process.env.REACT_APP_API_KEY_NYT;
const googleBookIdUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

const styles = {
  container: {
    ml: "10rem",
    // mt: "3rem",
    p:5
  },
};

const SingleBook = () => {
  const { id } = useParams();
  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const notify = () =>
    toast.success("Added to cart!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });

  useEffect(() => {
    axios.get(`${googleBookIdUrl}${id}`).then((data) => {
      setSingleBook(data.data.items[0].volumeInfo);
      setLoading(false);
    });
  }, {});

  if (loading) {
    return (
      <section>
        <Loader>Loading...</Loader>
      </section>
    );
  }

  console.log(singleBook);

  const { title, description, publishedDate, averageRating, printType } =
    singleBook;

  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={styles.container}
    >
      <Grid item xs={3}>
        <img style={{ width: 300 }} src={singleBook.imageLinks.thumbnail}></img>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h3" fontWeight={500} sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Typography variant="h4">by {singleBook.authors[0]}</Typography>
        <Grid item display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">{publishedDate}</Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ m: 1, bgcolor: "black" }}
          />
          <Rating
            sx={{ m: 0 }}
            value={averageRating}
            precisio={0.5}
            readOnly
            size="large"
          ></Rating>
        </Grid>
        <Grid item display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h3" fontWeight={500}>
            $19.99
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ m: 1, bgcolor: "black" }}
          />
          <Typography variant="h4" sx={{ color: "grey" }}>
            {printType}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: "60%",
            background: "rgba(235,235,235,.25)",
            p: "2rem",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{ background: "#1976d2", mb: 2, height: 40 }}
            fullWidth
            onClick={() => {
              addToCart(
                title,
                19.99,
                singleBook.imageLinks.smallThumbnail,
                singleBook.authors[0]
              );
              notify();
            }}
          >
            ADD TO CART
          </Button>
          <ToastContainer />

          <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
            Buy Online
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid item display="flex" sx={{ mb: 2 }}>
            <RocketLaunchIcon sx={{ m: 0, mr: 2 }} />
            <Grid item display="flex" flexDirection="column">
              <Typography variant="h5" fontWeight={500}>
                Ship to home
              </Typography>
              <Typography variant="h6">
                Free shipping on orders over $50
              </Typography>
            </Grid>
          </Grid>
          <Grid item display="flex">
            <RocketLaunchIcon sx={{ m: 0, mr: 2 }} />
            <Grid item display="flex" flexDirection="column">
              <Typography variant="h5" fontWeight={500}>
                Pick up at store
              </Typography>
              <Typography variant="h6">
                Free shipping on orders over $50
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ width: "70%" }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            About
          </Typography>
          <Typography variant="h5">{description}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleBook;
