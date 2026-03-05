import "./global.css";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Home from "./components/Pages/HomePage";
import { AppText, Loader } from "./components/common";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./components/Pages/HomePage";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./components/Pages/AuthScreen";
import AuthScreen from "./components/Pages/AuthScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SchemeScreen from "./components/Pages/SchemeScreen";
import DashboardScreen from "./components/Pages/DashboardScreen";
import AppNavigator from "./components/Pages/AppNavigator";
import { useCallback, useEffect, useState } from "react";
import { getOrCreateDeviceId } from "./services/ClientSideService";
import { logger } from "./utils/logger";
import { refreshAccessToken } from "./services/AuthService";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import DrawerNavigator from "./layout/DrawerLayout";
import { clearSecureStore } from "./services/SecureStoreService";

SplashScreen.preventAutoHideAsync();
type TokenPayload = {
  exp: number;
};

// 1️⃣ Define your route types
export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Scheme: undefined;
  Dashboard: undefined;
};

// 2️⃣ Create stack with types
const Stack = createNativeStackNavigator<RootStackParamList>();

// 3️⃣ Home Screen
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function App() {
  // TO ensure device id is fetched
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

function MainApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser } = useAuth();

  useEffect(() => {
    const initDevice = async () => {
      try {
        const deviceId = await getOrCreateDeviceId();
        logger.debug("Device Id : " + deviceId);
      } catch (error) {
        console.error("Device ID generation failed", error);
      } finally {
        setLoading(false);
      }
    };

    initDevice();
  }, []);

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    const access = await SecureStore.getItemAsync("accessToken");
    const refresh = await SecureStore.getItemAsync("refreshToken");
    const name = await SecureStore.getItemAsync("userName");
    const userMobileNo = await SecureStore.getItemAsync("userMobileNo");
    console.log(access, refresh, name, userMobileNo);
    setUser({
      user: userMobileNo,
      name: name,
      message: "",
      accessToken: access,
      refreshToken: refresh,
    });
    if (!access || !refresh || !name || !userMobileNo) {
      clearSecureStore();
      setInitialRoute("Auth");

      return;
    }

    const decoded = jwtDecode<TokenPayload>(access);
    const now = Date.now() / 1000;

    if (decoded.exp > now) {
      setInitialRoute("Home");
    } else {
      const refreshed = await refreshAccessToken(refresh);
      setInitialRoute(refreshed ? "Home" : "Auth");
    }
  };

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
