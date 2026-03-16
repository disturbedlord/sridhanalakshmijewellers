import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cart, CartItem } from "../Types/CartTypes";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // // Load cart from storage
  // useEffect(() => {
  //   loadCart();
  // }, []);

  const loadCart = (initialData: Cart) => {
    if (initialData) setCart(initialData.items);
  };

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    // await AsyncStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product: CartItem) => {
    let items = [...cart];

    const index = items.findIndex((p) => p.product_id === product.product_id);

    if (index >= 0) {
      items[index].quantity += 1;
    } else {
      items.push({ ...product });
    }

    saveCart(items);
  };

  const removeFromCart = (id: Number) => {
    let items = [...cart];

    const index = items.findIndex((p) => p.product_id === id);

    if (index >= 0) {
      items[index].quantity -= 1;
      if (items[index].quantity <= 0) {
        console.log("Deleting from cart : id : ", id);
        deleteFromCart(id);
      } else {
        saveCart(items);
      }
    }
  };
  const deleteFromCart = (id) => {
    console.log("DELETE : ", id);
    const items = cart.filter((p) => p.product_id !== id);
    // console.log(items);
    saveCart(items);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        removeFromCart,
        clearCart,
        deleteFromCart,
      }}
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
