import "./global.css";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
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
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function HomeScreen() {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <Home />
      </ScrollView>
      <Pressable
        onPress={() => console.log("FAB pressed")}
        className="absolute bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full items-center justify-center shadow-lg z-50"
      >
        <FontAwesome name="whatsapp" size={24} color="white" />
      </Pressable>
    </View>
  );
}
