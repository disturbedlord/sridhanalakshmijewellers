import { BackendAPI } from "../components/common";

export const GetAllProducts = async (accessToken: string) => {
  try {
    // console.log("accessToken", accessToken);
    // Attach device details to login
    const response = await fetch(`${BackendAPI}/shop/getProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (response.ok && data.status === 1) {
      return data;
    } else {
      // Show error message
      console.log("GetAllProducts failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("GetAllProducts : Error:", error);
    return error;
  }
};
