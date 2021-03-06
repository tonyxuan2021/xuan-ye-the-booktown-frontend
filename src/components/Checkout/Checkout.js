import React, { useContext } from "react";
import CartContext from "../../CartContext";
import uniqid from "uniqid";
import "./Checkout.scss";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const { items } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);

  const itemPrice = parseFloat(
    items.reduce((a, c) => a + c.price, 0).toFixed(2)
  );
  const taxPrice = parseFloat((itemPrice * 0.12).toFixed(2));
  const shippingPrice = itemPrice > 50 ? 0 : 9.99;
  const totalPrice = parseFloat(
    (itemPrice + shippingPrice + taxPrice).toFixed(2)
  );

  const notify = () =>
    toast.error("Deleted from cart!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });

  const makePayment = (token) => {
    const body = {
      token,
      items,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:5050/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="checkout__title">Your Books Shopping Cart</h1>
      <div className="checkout__page__wrapper">
        <div className="checkout__wrapper">
          {items.map((item) => {
            return (
              <div className="checkout__book__wrapper" key={uniqid()}>
                <img className="checkout__img" src={item.img}></img>
                <div className="checkout__book__flex">
                  <div className="checkout__book__title__wrapper">
                    <h3 className="checkout__book__name">{item.name}</h3>
                    <p className="checkout__book__author">{`by ${item.author}`}</p>
                  </div>
                  <h3 className="checkout__book__price">{`$ ${item.price}`}</h3>
                  <button
                    className="checkout__book__remove"
                    onClick={() => {
                      notify();
                      removeFromCart(item.name);
                    }}
                  >
                    REMOVE
                  </button>
                  <ToastContainer />
                </div>
              </div>
            );
          })}
        </div>
        <div className="order__summary">
          <h2 className="order__title">Order Summary</h2>
          <div className="order__subtotal">
            <p>Subtotal</p>
            <p>{itemPrice}</p>
          </div>
          <div className="order__shipping">
            <p>Shipping</p>
            <p>{itemPrice ? shippingPrice : 0}</p>
          </div>
          <div className="order__tax">
            <p>Tax (12% - British Columbia)</p>
            <p>{taxPrice}</p>
          </div>
          <div className="order__total__wrapper">
            <h3 className="order__total">Total</h3>
            <h3 className="order__total__amt">{itemPrice ? totalPrice : 0}</h3>
          </div>

          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            token={makePayment}
            name="Enter your shipping info"
            amount={totalPrice * 100}
            shippingAddress
            billingAddress
            style={{ margin: 0 }}
          >
            <button className="order__button">
              Ready to Checkout ${itemPrice ? totalPrice : 0}
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
