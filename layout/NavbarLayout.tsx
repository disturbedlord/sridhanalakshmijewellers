import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/HomeComponents/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ navigation }: any) => {
  return <Navbar />;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbar: {
    height: 60,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
  },
  navTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  content: { flex: 1 },
});

export default Layout;
