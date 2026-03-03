import { createContext, useContext, useState } from "react";
import { LoginPayload, UserLogin } from "../services/AuthService";
import { logger } from "../utils/logger";

type AuthContextType = {
  user: {
    user: string;
    name: string;
    message: string;
    token: string;
  } | null;
  login: (payload: LoginPayload) => Promise<{ msg: string; status: number }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    user: string;
    name: string;
    message: string;
    token: string;
  } | null>(null);
  const login = async (payload: LoginPayload) => {
    try {
      const data = await UserLogin(payload); // Call AuthService to log the user in
      logger.debug(data);

      if (data && data.user) {
        setUser(data); // Store user
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
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
