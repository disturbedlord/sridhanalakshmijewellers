import { TouchableOpacity, View } from "react-native";
import { AppText, Img } from "../common";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../../assets/images/dlogo.jpeg";
import PriceTicker from "./PriceTicker";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View className="shadow-2xl bg-white ">
      <View className="flex flex-row  space-x-2 pl-2 bg-[#FEF7F7] ">
        <PriceTicker />
      </View>
      <View className="bg-white flex-row items-center  px-2 py-3">
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="w-12 h-12 flex items-center justify-center "
        >
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2 ">
          <Img src={logo} size={44} className="rounded-full " />

          <AppText className="font-poppins-bold text-[#b26a00] text-lg">
            SRI DHANALAKSHMI Jewellery
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
