import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../components/Pages/HomePage";
import CustomDrawerContent from "../components/Drawer/DrawerComponent";
import AuthScreen from "../components/Pages/AuthScreen";
import Layout from "./NavbarLayout";
import SchemeScreen from "../components/Pages/SchemeScreen";
import SchemeDetails from "../components/Pages/SchemeDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MySchemeDetails from "../components/Pages/MySchemeDetails";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Navbar from "../components/HomeComponents/Navbar";
import ShopScreen from "../components/Pages/ShopScreen";
import ProductScreen from "../components/Pages/ProductScreen";
import CartScreen from "../components/Pages/CartScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ initialRoute }: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          width: 250, // adjust drawer width if needed
        },
        drawerType: "front", // 'front' is faster than 'slide'
        swipeEdgeWidth: 50, // optional
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Schemes"
        component={SchemeStack}
        initialParams={{ initialRoute: initialRoute }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function SchemeStack({ route, navigation }: any) {
  const { initialRoute } = route.params;
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={AuthScreen}
      />

      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="SavingSchemes"
        component={SchemeScreen}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="SchemeDetails"
        component={SchemeDetails}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="MySchemeDetails"
        component={MySchemeDetails}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="ShopScreen"
        component={ShopScreen}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="ProductScreen"
        component={ProductScreen}
      />
      <Stack.Screen
        options={{ header: () => <Navbar /> }}
        name="CartScreen"
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}
