import { Button, Divider, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CartContext from "../CartContext";
import Loader from "../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";
import { theme } from "../theme";

const API_KEY_NYT = process.env.REACT_APP_API_KEY_NYT;
const googleBookIdUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

const Wrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    paddingLeft: 90,
    paddingRight: 90,
  },
}));

const RightWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
}));

const AboutText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

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

  // console.log(singleBook);

  const { title, description, publishedDate, averageRating, printType } =
    singleBook;

  return (
    <Wrapper container spacing={0.5}>
      <Grid item md={5}>
        <img
          style={{ width: "100%" }}
          src={singleBook.imageLinks.thumbnail}
        ></img>
      </Grid>
      <RightWrapper item md={6}>
        <Typography variant="h2" fontWeight={700} sx={{ mb: 3 }}>
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
            background: "rgba(235,235,235,.25)",
            p: "6rem",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: theme.palette.primary.main,
              mb: 2,
              height: 40,
              textTransform: "capitalize",
              "&:hover": { opacity: 0.75 },
            }}
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
            <Typography variant="h5">add to cart</Typography>
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
        <Grid item sx={{ p: 3 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            About
          </Typography>
          <Typography lineHeight={1.6} variant="h5">
            {description}
          </Typography>
        </Grid>
      </RightWrapper>
    </Wrapper>
  );
};

export default SingleBook;
