import React, { useContext, useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CartContext } from "../../context/cartContext";

const Cart = () => {
  const { cartItems, removeFromCart, handleOrder } = useContext(CartContext);
  console.log(cartItems);
  const [isOpen, setIsOpen] = useState(false);

  const cartRef = useRef();
  useClickOutside(cartRef, () => setIsOpen(false));

  return (
    <div>
      {isOpen && (
        <div
          className="test"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: `rgba(0,0,0,0.4)`,
            zIndex: 10,
          }}
        ></div>
      )}
      <div
        ref={cartRef}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: 20,
          zIndex: 20,
          backgroundColor: "#00ada4",
          color: "white",
          border: "1px solid white",
          borderRadius: "5px"
        }}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          style={{ fontWeight: "bold", fontFamily: "Arial" }}
        >
          {" "}
          🛒 {cartItems.length && cartItems.length}
        </div>

        <div
          style={{
            display: !isOpen ? "none" : "block",
          }}
        >
          {cartItems.map((pizza) => (
            <div key={pizza.id + pizza.selectedPizzaSize}>
              <h2 style={{ fontSize: "20px", textAlgin: "center" }}>
                {pizza.name}{" "}
                <button
                  onClick={() =>
                    removeFromCart(pizza.id, pizza.selectedPizzaSize)
                  } style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid grey",
                  }}
                >
                  &#x2718;
                </button>
              </h2>
              <h2 style={{ fontSize: "20px", textAlgin: "center" }}>{pizza.selectedPizzaSize}</h2>
              <div style={{ fontSize: "18px", textAlgin: "center", fontFamily: "Arial", fontWeight: "bold" }}>
                {pizza.selectedPizzaSize === "мала" &&
                  "Цена:" +
                  pizza.priceSmall * pizza.quantity +
                  "ден  -  " +
                  pizza.quantity}
              </div>
              <div style={{ fontSize: "18px", textAlgin: "center", fontFamily: "Arial", fontWeight: "bold" }}>
                {pizza.selectedPizzaSize === "голема" &&
                  "Цена:" +
                  pizza.priceBig * pizza.quantity +
                  "ден  -  " +
                  pizza.quantity}
              </div>
            </div>
          ))}

          <button onClick={handleOrder} style={{
            border: "0",
            borderRadius: "10px",
            padding: "5px",
            margin: "2px",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold"
          }}>Order all</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
