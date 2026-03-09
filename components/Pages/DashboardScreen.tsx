import { View } from "react-native";
import { AppText, Loader } from "../common";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { logger } from "../../utils/logger";
import { GetAllSchemes } from "../../services/DashboardService";
import React from "react";
import { Text, Modal, TouchableOpacity, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState();
  const [loading, setLoading] = useState(true);
  const [schemesItems, setSchemesItems] = useState<any[]>([]);
  const getAllSchemes = async () => {
    setLoading(true);
    const schemes = await GetAllSchemes(user?.token);
    // logger.debug(schemes);
    if (schemes && schemes["schemes"].length > 0) {
      const formatted = schemes.schemes.map((item: any) => ({
        label: item.name,
        value: item.name, // better to use id instead of name
      }));

      setSchemesItems(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      getAllSchemes();
    }
  }, [user?.token]);

  if (!user) {
    return (
      <View>
        <AppText>Login Error</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <View className="h-44 shadow-lg flex gap-2 bg-white p-4 rounded-md">
        <View>
          <AppText className="font-poppins-bold text-2xl underline">
            Hello <AppText className=" font-poppins-bold">{user.name},</AppText>
          </AppText>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View className="flex-1 gap-5">
            <AppText>Current Scheme: 500/month</AppText>
            <Dropdown schemeData={schemesItems} />
          </View>
        )}
      </View>
    </View>
  );
}

type DropdownProps = {
  schemeData: any[];
};

const Dropdown = ({ schemeData }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(schemeData);
  }, [schemeData]);

  return (
    <View className="flex-1 z-50">
      <DropDownPicker
        open={open}
        value={value}
        placeholder="Select a scheme"
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};
