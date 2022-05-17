import React, { useContext } from "react";
import CartContext from "../../CartContext";
import uniqid from "uniqid";
import "./Checkout.scss";
import Footer from "../Footer/Footer";
import StripeCheckout from "react-stripe-checkout";
import axios, { AxiosError } from "axios";

// console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)

const Checkout = () => {
  const { items } = useContext(CartContext);

  //   console.log(items)

  const itemPrice = items.reduce((a, c) => a + c.price, 0);
  const taxPrice = parseInt((itemPrice * 0.12).toFixed(2));
  const shippingPrice = itemPrice > 50 ? 0 : 9.99;
  const totalPrice = parseInt(
    (itemPrice + shippingPrice + taxPrice).toFixed(2)
  );

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
                    <h2 className="checkout__book__name">{item.name}</h2>
                    <p className="checkout__book__author">{`by ${item.author}`}</p>
                  </div>
                  <h2 className="checkout__book__price">{`$ ${item.price}`}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order__summary">
          <h1 className="order__title">Order Summary</h1>
          <div className="order__subtotal">
            <p>Subtotal</p>
            <p>{itemPrice}</p>
          </div>
          <div className="order__shipping">
            <p>Shipping</p>
            <p>{shippingPrice}</p>
          </div>
          <div className="order__tax">
            <p>Tax (12% - British Columbia)</p>
            <p>{taxPrice}</p>
          </div>
          <div className="order__total__wrapper">
            <h3 className="order__total">Total</h3>
            <h3 className="order__total__amt">{totalPrice}</h3>
          </div>

          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            token={makePayment}
            name="Buy books"
            amount={totalPrice * 100}
          >
            <button className="order__button">
              Ready to Checkout ${totalPrice}
            </button>
          </StripeCheckout>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
