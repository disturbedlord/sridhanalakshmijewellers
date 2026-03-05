import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomePage";
import SchemeScreen from "./SchemeScreen";
import DashboardScreen from "./DashboardScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 1️⃣ Define your route types
export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Scheme: undefined;
  Dashboard: undefined;
  Payments: undefined;
};

// 2️⃣ Create stack with types
const Stack = createNativeStackNavigator<RootStackParamList>();

// 3️⃣ Home Screen
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function AppNavigator({ initialRoute }: any) {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scheme" component={SchemeScreen} />
      {/* <Stack.Screen name="Dashboard" component={TabbedScreen} /> */}
    </Stack.Navigator>
  );
}

// const Tab = createBottomTabNavigator();

// const TabbedScreen = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: {
//           height: 50,
//           paddingBottom: 10,
//           backgroundColor: "white",
//         },
//         tabBarActiveTintColor: "#DA4848",
//         tabBarInactiveTintColor: "gray",
//         tabBarIcon: ({ color }) => {
//           if (route.name === "Dashboard") {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard-outline"
//                 color={color}
//                 size={24}
//               />
//             );
//           } else if (route.name === "MySchemes") {
//             return (
//               <MaterialCommunityIcons
//                 name="account-card-outline"
//                 color={color}
//                 size={24}
//               />
//             );
//           }
//         },
//       })}
//     >
//       <Tab.Screen
//         name="Dashboard"
//         options={
//           {
//             // tabBarLabel: () => (
//             //   <AppText className="font-poppins-semibold text-sm">
//             //     Dashboard
//             //   </AppText>
//             // ),
//           }
//         }
//         component={DashboardScreen}
//       />
//       <Tab.Screen
//         name="MySchemes"
//         options={
//           {
//             // tabBarLabel: () => (
//             //   <AppText className="font-poppins-semibold text-sm">
//             //     My Schemes
//             //   </AppText>
//             // ),
//           }
//         }
//         component={MySchemes}
//       />
//     </Tab.Navigator>
//   );
// };
