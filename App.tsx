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
import { AppText } from "./components/common";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./components/Pages/HomePage";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./components/Pages/AuthScreen";
import AuthScreen from "./components/Pages/AuthScreen";
import { AuthProvider } from "./context/AuthContext";
import SchemeScreen from "./components/Pages/SchemeScreen";
import DashboardScreen from "./components/Pages/DashboardScreen";

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
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // or splash screen
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: "fade",
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Scheme" component={SchemeScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
