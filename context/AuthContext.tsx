import { createContext, useContext, useState } from "react";
import { LoginPayload, UserLogin } from "../services/AuthService";
import { logger } from "../utils/logger";
import * as SecureStore from "expo-secure-store";
import { clearSecureStore } from "../services/SecureStoreService";

type User = {
  userId: string;
  name: string;
  message: string;
  mobileNo: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (payload: LoginPayload) => Promise<{ msg: string; status: number }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function saveTokens(
  access: string,
  refresh: string,
  name: string,
  userMobileNo: string,
  userId: string,
) {
  await SecureStore.setItemAsync("accessToken", access);
  await SecureStore.setItemAsync("refreshToken", refresh);
  await SecureStore.setItemAsync("userName", name);
  await SecureStore.setItemAsync("userMobileNo", userMobileNo);
  await SecureStore.setItemAsync("userId", userId);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (payload: LoginPayload) => {
    try {
      const data = await UserLogin(payload); // Call AuthService to log the user in
      logger.debug(data);

      if (data && data.userId) {
        setUser(data); // Store user
        saveTokens(
          data.accessToken,
          data.refreshToken,
          data.name,
          data.userMobileNo,
          data.userId,
        );
        return { msg: data.message, status: 1 };
      } else if (data && data.error) {
        return { msg: data.error, status: 0 };
      } else {
        return { msg: "Login Failed", status: 0 };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { msg: "Login Failed", status: 0 };
    }
  };

  const logout = () => {
    setUser(null);
    clearSecureStore();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const getUserId = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("getUserId must be used within an AuthProvider");
  }
  return context.user?.userId;
};

export const getAccessToken = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("getAccessToken must be used within an AuthProvider");
  }
  return context.user?.accessToken;
};
