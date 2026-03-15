import { AddToCart, Cart, CartResponse } from "../Types/CartTypes";
import { LogError } from "../utils/logger";
import { postRequest } from "./api";
import {
  GetCartId,
  GetUserId,
  SetSecureStoreValue,
} from "./SecureStoreService";

export const CreateCart = async (): Promise<Boolean> => {
  try {
    const userId = await GetUserId();
    const cart = await postRequest<CartResponse>("/cart/createCart", {
      userId: userId,
    });
    if (
      cart.success &&
      (await SetSecureStoreValue("cartId", cart.result.cartId))
    ) {
      return true;
    } else {
      LogError("CreateCart : Error in Creating Cart Id");
      return false;
    }
  } catch (err) {
    LogError("CreateCart", err);
    return false;
  }
};

export const AddItemToCart = async (
  productId: string,
  qty: number,
): Promise<Boolean> => {
  try {
    const cartId = await GetCartId();
    const cart = await postRequest<AddToCart>("/cart/addToCart", {
      cartId: cartId,
      productId: productId,
      qty: qty,
    });

    if (cart.success) {
      return true;
    } else {
      LogError("CreateCart : Error in Creating Cart Id");
      return false;
    }
  } catch (err) {
    LogError("CreateCart", err);
    return false;
  }
};

export const GetCart = async (): Promise<Cart | null> => {
  try {
    const cartId = await GetCartId();
    if (!cartId) return null;
    const cart = await postRequest<Cart>("/cart/getCart", {
      cartId: cartId,
    });

    if (cart.success) {
      return cart;
    } else {
      LogError("CreateCart : Error in Creating Cart Id ", cart.error);
      return null;
    }
  } catch (err) {
    LogError("CreateCart", err);
    return null;
  }
};
