import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../components/Pages/HomePage";
import CustomDrawerContent from "../components/Drawer/DrawerComponent";
import AuthScreen from "../components/Pages/AuthScreen";
import Layout from "./NavbarLayout";
import SchemeScreen from "../components/Pages/SchemeScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="SavingSchemes" component={SchemeScreen} />
      <Drawer.Screen name="Settings" component={HomeScreen} />
      <Drawer.Screen name="Auth" component={AuthScreen} />
    </Drawer.Navigator>
  );
}
