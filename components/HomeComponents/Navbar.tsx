import { TouchableOpacity, View } from "react-native";
import { AppText, Img } from "../common";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../../assets/images/dlogo.jpeg";

const Navbar = () => {
  return (
    <View className="bg-white flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-2">
        <Img src={logo} size={44} className="rounded-full " />

        <AppText className="font-poppins-bold text-[#b26a00] text-lg">
          SRI DHANALAKSHMI Jewellery
        </AppText>
      </View>

      <TouchableOpacity onPress={() => console.log("Menu Clicked")}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
