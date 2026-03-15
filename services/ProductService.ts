import { BackendAPI } from "../components/common";
import { GetSecureStoreAccessToken } from "./SecureStoreService";
import * as SecureStore from "expo-secure-store";

export const GetProductDetails = async (
  productId: number,
  accessToken: string,
) => {
  try {
    // console.log("accessToken", accessToken);
    // Attach device details to login
    const response = await fetch(`${BackendAPI}/product/getProductDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: productId }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok && data.status === 1) {
      return data;
    } else {
      // Show error message
      console.log("GetProductDetails failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("GetProductDetails : Error:", error);
    return error;
  }
};
