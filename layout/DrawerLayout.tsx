import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../components/Pages/HomePage";
import CustomDrawerContent from "../components/Drawer/DrawerComponent";
import AuthScreen from "../components/Pages/AuthScreen";
import Layout from "./NavbarLayout";
import SchemeScreen from "../components/Pages/SchemeScreen";
import SchemeDetails from "../components/Pages/SchemeDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <Layout />,
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
      <Drawer.Screen name="Schemes" component={SchemeStack} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function SchemeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SavingSchemes" component={SchemeScreen} />
      <Stack.Screen name="SchemeDetails" component={SchemeDetails} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
