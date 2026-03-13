import { BackendAPI } from "../components/common";
import { logger } from "../utils/logger";
import { getDeviceInfo } from "./ClientSideService";

export type LoginPayload = {
  device_data?: {
    deviceId: string;
    device_name: string;
    platform: "ios" | "android" | "windows" | "macos" | "web";
    app_version: string | null;
    build_number: string | null;
    refresh?: string | null;
  };
  mobile_no: string;
  password: string;
};

export type RegisterPayload = {
  mobile_no: string;
  name: string;
  password: string;
};

const CreateHeaderWithDeviceId = async () => {
  return await getDeviceInfo();
};

export const UserLogin = async (requestData: LoginPayload) => {
  try {
    const headers = await CreateHeaderWithDeviceId();
    // Attach device details to login
    requestData.device_data = headers;
    const response = await fetch(`${BackendAPI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      // Show error message
      console.log("Login failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

export const UserRegister = async (requestData: RegisterPayload) => {
  try {
    const response = await fetch(`${BackendAPI}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful Register
      return data.message;
    } else {
      // Show error message
      console.log("Login failed with error : ", data.message);
      return data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export const refreshAccessToken = async (refresh: string) => {
  try {
    logger.debug("Called RefereshAccessToken");
    const headers = await CreateHeaderWithDeviceId();
    // logger.debug(headers);
    // logger.debug(refresh);

    // Attach device details to login
    const modifiedHeaders = { device_data: headers, refreshToken: refresh };
    // logger.debug(modifiedHeaders);
    console.log(JSON.stringify(modifiedHeaders));
    const response = await fetch(`${BackendAPI}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedHeaders),
    });

    const data = await response.json();
    console.log("Avi :  ", data);
    if (response.ok) {
      return data;
    } else {
      // Show error message
      console.log("Refresh Token failed with error  : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
