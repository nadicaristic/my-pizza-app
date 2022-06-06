import React, { useState, createContext, useEffect } from "react";
import Api from "../Api";
import ordering from "../pizzaordering/ordering";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [pizzaProducts, setPizzaProducts] = useState([]);
  useEffect(function(){
    Api().get('/pizzas').then(pizzas => { 
        const data = pizzas.data.map((item) => {
          return { ...item, id: item._id };
        });
        setPizzaProducts(data);
    })
  },[])
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (id, quantity, selectedPizzaSize) => {
    let newPizzaArray = ordering.addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts);
    setCartItems(newPizzaArray);
  };

  const removeFromCart = (id, selectedPizzaSize) => {
    let newPizzaArray = ordering.removePizzaFromCart(id, selectedPizzaSize, cartItems);
    setCartItems(newPizzaArray);
  };

  const emptyCart = () => {
    setCartItems([])
  }

  const handleOrder = () => {
    const email = prompt("Внесете  го вашиот email: ", "");
    const address = prompt("Внесете ја вашата адреса: ", "");
    Api().post('/orders', { email, address, cartItems })
      .then(() => {
        emptyCart();
        alert('Ви благодариме што купувате кај нас!');
      })
      .catch((e) => console.error(e));
  };

  const value = { pizzaProducts, cartItems, addToCart, removeFromCart, emptyCart, handleOrder, setPizzaProducts };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };