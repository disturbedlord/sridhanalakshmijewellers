import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from storage
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  };

  const saveCart = async (items) => {
    setCart(items);
    await AsyncStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product) => {
    let items = [...cart];

    const index = items.findIndex((p) => p.id === product.id);

    if (index >= 0) {
      items[index].qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }

    saveCart(items);
  };

  const removeFromCart = (id) => {
    let items = [...cart];

    const index = items.findIndex((p) => p.id === id);

    if (index >= 0) {
      items[index].qty -= 1;
      if (items[index].qty <= 0) {
        console.log("Deleting from cart : id : ", id);
        deleteFromCart(id);
      } else {
        saveCart(items);
      }
    }
  };
  const deleteFromCart = (id) => {
    console.log("DELETE : ", id);
    const items = cart.filter((p) => p.id !== id);
    // console.log(items);
    saveCart(items);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, deleteFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};
