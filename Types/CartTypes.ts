export type CartResponse = {
  success: Boolean;
  result: { cartId: string };
  error: string;
};

export type AddToCart = {
  success: Boolean;
};

export type CartItem = {
  productId: Number;
  quantity: Number;
};

export type Cart = {
  success: Boolean;
  items: CartItem[];
  error: string;
};
