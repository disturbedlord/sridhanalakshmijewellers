import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AppText } from "../common";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawerContent(props: any) {
  const navigation = useNavigation();

  const { user, logout } = useAuth();
  // console.log(user);
  // console.log(user);
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    logout();
    navigation.navigate("Auth");
  };

  return (
    <View style={{ flex: 1 }} className="rounded-none">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 25 }}
      >
        {/* User Name */}
        <AppText className="font-poppins-bold text-2xl">
          Hi {user?.name},
        </AppText>
        <AppText className="font-poppins text-base">
          <AppText className="font-poppins-semibold">Mobile : </AppText>
          {user?.userMobileNo}
        </AppText>

        {/* Line Break */}
        <View
          style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }}
        />

        {/* Drawer Items / Tabs */}
        <DrawerItem
          labelStyle={{
            fontFamily: "Poppins_600Regular",
            color: "black",
            fontSize: 16,
          }}
          label="Home"
          onPress={() => navigation.navigate("Home")}
        />
        <DrawerItem
          labelStyle={{
            color: "black",
            fontSize: 16,

            fontFamily: "Poppins_600Regular",
          }}
          label="Saving Schemes"
          onPress={() => navigation.navigate("SavingSchemes")}
        />
        <DrawerItem
          labelStyle={{
            color: "black",
            fontSize: 16,

            fontFamily: "Poppins_600Regular",
          }}
          label="Shop"
          onPress={() => navigation.navigate("ShopScreen")}
        />
      </DrawerContentScrollView>

      {/* Logout Button at bottom */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <AppText className="bg-red-500 p-4 text-center text-white font-poppins-semibold rounded-md">
          Logout
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "transparent",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
