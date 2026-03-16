export type CartResponse = {
  success: Boolean;
  result: { cartId: string };
  error: string;
};

export type ModifyItemInCart = {
  success: Boolean;
};

export type CartItem = {
  product_id: number;
  quantity: number;
  image: string;
  price: string;
  name: string;
};

export type Cart = {
  success: Boolean;
  items: CartItem[];
  error: string;
};
