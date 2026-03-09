import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PriceTicker from "../HomeComponents/PriceTicker";
import { AppText, Img, VideoScreen, width } from "../common";
import goldBiscuit from "../../assets/images/gold.png";
import silverBiscuit from "../../assets/images/silver.png";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import Navbar from "../HomeComponents/Navbar";
import { ImageSlider } from "../HomeComponents/ImageSlider";
import { HomeScreenNavigationProp } from "../../App";
import {
  galleryImages,
  testimonials,
  whyUsData,
} from "../HomeComponents/HomeScreenData";
import { GetLatestPrice } from "../../services/DashboardService";
import { getAccessToken } from "../../context/AuthContext";

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: any) {
  const openWhatsApp = () => {
    const phone = "919361795050"; // country code + number
    const url = `https://wa.me/${phone}`;

    Linking.openURL(url);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <Home navigation={navigation} />
      </ScrollView>
      <Pressable
        onPress={() => openWhatsApp()}
        className="absolute bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full items-center justify-center shadow-lg z-50"
      >
        <FontAwesome name="whatsapp" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export function Home({ navigation }: any) {
  return (
    <View className="sm:hidden block bg-[#FFF6EC] w-full  relative  text-left mx-auto">
      {/* Top Gold Rate Bar */}

      {/* Banner */}
      <ImageSlider />

      {/* Categories Section */}
      <View className="items-center mt-8 px-4">
        <AppText className="text-orange-500 tracking-widest text-sm">
          SHOP BY
        </AppText>

        <AppText className="text-3xl font-poppins-bold text-gray-800 mt-2">
          Categories
        </AppText>

        <AppText className="text-gray-500 text-center mt-3">
          Crafted with purity, precision and honesty
        </AppText>

        <View className="w-full mt-10 mb-5">
          <TouchableOpacity className="bg-white w-full py-5 flex justify-center items-center shadow-lg rounded-xl">
            <View className="w-28 h-28 mx-auto flex items-center mb-5 justify-center rounded-full bg-orange-50 group-hover:scale-105 transition">
              <Img src={goldBiscuit} size={80} />
            </View>
            <AppText className="font-poppins-bold text-lg text-orange-700">
              Gold
            </AppText>
            <AppText className="text-sm text-gray-500">
              Explore gold jewellery
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white w-full mt-5 py-5 flex justify-center items-center shadow-lg rounded-xl">
            <View className="w-28 h-28 mx-auto flex items-center mb-5 justify-center rounded-full bg-orange-50 group-hover:scale-105 transition">
              <Img src={silverBiscuit} size={80} />
            </View>
            <AppText className="font-poppins-bold text-lg text-orange-700">
              Silver
            </AppText>
            <AppText className="text-sm text-gray-500">
              Explore Silver designs
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gallery Section */}
      <View className="items-center mt-8 py-10 px-4 bg-white">
        <AppText className="text-orange-500 tracking-widest text-sm">
          OUR COLLECTION
        </AppText>

        <AppText className="text-3xl font-poppins-bold text-gray-800 mt-2">
          Gallery
        </AppText>
        <View className="border-b-4 rounded-xl my-4 border-b-orange-400 w-20 h-0"></View>
        <View>
          {galleryImages.map((item, ind) => {
            return (
              <View
                key={ind}
                className="relative overflow-hidden rounded-2xl shadow-md  my-2"
              >
                <Img
                  src={item}
                  size={width - 40}
                  className="w-full h-80 object-contain"
                  resize="cover"
                />
                <View className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end"></View>
              </View>
            );
          })}
        </View>
        <View className="my-5">
          <TouchableOpacity className="bg-[#b77b57] px-10 py-3 rounded-full">
            <AppText className="text-white font-poppins-bold">
              Explore Collection
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Why Us Section */}
      <View className="bg-[#fff8f1] w-full items-center px-4">
        <View className="my-8 flex items-center">
          <AppText className="text-orange-500 tracking-widest text-sm">
            WHY CHOOSE US
          </AppText>
          <AppText className="text-3xl font-poppins-bold text-gray-800 mt-2">
            Jewellery You Can Trust
          </AppText>
          <AppText className="text-gray-500 text-center mt-3">
            Crafted with purity, precision and care to celebrate your moments
          </AppText>
        </View>
        <View>
          {whyUsData.map((item, idx) => (
            <View
              key={idx}
              className="my-4 p-5 flex w-full bg-white rounded-xl shadow items-center"
            >
              <Img src={item.img} size={100} />
              <AppText className="font-poppins-semibold text-xl mt-2">
                {item.title}
              </AppText>
              <AppText className="text-gray-500 text-sm text-center mt-2">
                {item.desc}
              </AppText>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <View className="bg-white w-full items-center py-10 px-4">
        <View className="my-8 flex items-center">
          <AppText className="text-orange-500 tracking-widesttext-sm">
            TESTIMONIALS
          </AppText>
          <AppText className="text-3xl font-poppins-bold  text-center  text-gray-800 mt-2">
            What Our Customers Say{" "}
          </AppText>
          <AppText className="text-gray-500 text-center mt-3">
            Trusted by customers who value purity, craftsmanship, and service.
          </AppText>
        </View>
        <View className="">
          {testimonials.map((item, idx) => (
            <View
              key={idx}
              className="flex gap-2 flex-col items-start mb-5 bg-white rounded-2xl p-8 shadow-md  transition"
            >
              <View className="flex flex-row gap-4">
                <View className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AppText className="text-orange-600 font-poppins-semibold">
                    {item.name[0]}
                  </AppText>
                </View>
                <View>
                  <AppText className="font-poppins-semibold text-gray-800">
                    {item.name}
                  </AppText>
                  <AppText className="text-sm text-gray-500">
                    {item.location}
                  </AppText>
                </View>
              </View>
              <AppText className="text-gray-600 text-sm leading-relaxed">
                "{item.comment}"
              </AppText>
            </View>
          ))}
        </View>
      </View>

      {/* Watch & Feel */}
      <View className="bg-[#fff8f1] w-full items-center px-4 py-10">
        <View className="py-10 flex items-center">
          <AppText className="text-orange-500 tracking-widesttext-sm">
            WATCH & FEEL
          </AppText>
          <AppText className="text-3xl font-poppins-bold  text-center  text-gray-800 mt-2">
            Watch Our Jewellery
          </AppText>
          <AppText className="text-gray-500 text-center mt-3">
            Experience the craftsmanship, shine, and elegance through our
            exclusive videos.
          </AppText>
        </View>
        <View className="w-full h-60 bg-black rounded-xl overflow-hidden">
          <VideoScreen videoSource={require("../../assets/videos/v1.mp4")} />
        </View>
        <View className="flex items-center p-4">
          <AppText className="text-lg font-poppins-semibold">
            Gold Jewellery
          </AppText>
          <AppText className="text-center text-sm text-gray-500">
            Traditional & modern designs in pure gold
          </AppText>
        </View>
        <View className="w-full h-60 mt-5 bg-black rounded-xl overflow-hidden">
          <VideoScreen videoSource={require("../../assets/videos/v2.mp4")} />
        </View>
        <View className="flex items-center p-4">
          <AppText className="text-lg font-poppins-semibold">
            Silver Jewellery
          </AppText>
          <AppText className=" text-center text-sm text-gray-500 ">
            Elegant silver crafted for everyday beauty
          </AppText>
        </View>
      </View>

      {/* Contact Us */}
      <View className="bg-white py-10">
        {/* Header */}
        <View className="items-center mb-10 pt-5">
          <AppText className="text-orange-500 tracking-widest text-sm font-semibold">
            GET IN TOUCH
          </AppText>

          <AppText className="text-3xl font-poppins-bold text-gray-800 mt-2">
            Contact Us
          </AppText>

          <AppText className="text-gray-500 text-center mt-3 text-base">
            Have a question about our jewellery or custom designs? We're happy
            to help.
          </AppText>
        </View>

        {/* Form */}
        <View className="gap-4 px-5">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            className="border font-poppins border-gray-300 rounded-xl px-4 py-4 text-gray-700"
          />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            className="border font-poppins border-gray-300 rounded-xl px-4 py-4 text-gray-700"
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#9ca3af"
            className="border font-poppins border-gray-300 rounded-xl px-4 py-4 text-gray-700"
          />

          <TextInput
            placeholder="Your Message"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="border font-poppins border-gray-300 rounded-xl px-4 py-4 text-gray-700 h-32"
          />

          {/* Button */}
          <TouchableOpacity className="bg-orange-500 rounded-xl py-4 mt-4">
            <AppText className="text-white font-poppins-bold text-center text-base">
              Send Message
            </AppText>
          </TouchableOpacity>
        </View>
        <View className="py-8">
          <MapCard />
        </View>
      </View>

      <View className="bg-[#020d2a] px-6 py-16 pb-6">
        <View>
          {/* Footer */}
          <Text className="text-white text-xl font-poppins-semibold">
            Dhanalakshmi Jewellery
          </Text>

          <Text className="text-gray-300 mt-4 leading-6">
            Trusted jewellery store offering authentic gold and silver
            collections, crafted with elegance and tradition.
          </Text>

          {/* Contact */}
          <View className="mt-8">
            <AppText className="text-white font-poppins-semibold text-lg mb-3">
              Contact
            </AppText>

            <View className="flex-row items-start mb-3">
              <FontAwesome5 name="map-pin" size={18} color="#ff4d4d" />
              <AppText className="text-gray-300 ml-2 flex-1">
                Bazar Street, Arcot, Ranipet – 632503
              </AppText>
            </View>

            <View className="flex-row items-center mb-3">
              <Ionicons name="call" size={18} color="#ff4d4d" />
              <AppText className="text-gray-300 ml-2">+91 93617 95050</AppText>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="email" size={18} color="#cccccc" />
              <AppText className="text-gray-300 ml-2">
                sridhanalakshmi@zohomail.in
              </AppText>
            </View>
          </View>

          {/* Social */}
          <View className="mt-8">
            <AppText className="text-white font-poppins-semibold text-lg mb-3">
              Connect With Us
            </AppText>

            <View className="flex-row gap-5 items-center">
              <Ionicons name="globe" size={20} color="#38bdf8" />
              <Entypo name="instagram" size={20} color="#ccc" />
              <Feather name="youtube" size={24} color="#3b82f6" />
            </View>
          </View>

          {/* Payments */}
          <View className="mt-8">
            <AppText className="text-white font-semibold text-lg mb-4">
              Payments
            </AppText>

            <View className="flex-row items-center gap-6">
              <AppText className="text-white font-semibold text-lg">
                GPay
              </AppText>
              <AppText className="text-purple-400 font-semibold text-lg">
                PhonePe
              </AppText>
              <AppText className="text-gray-400 font-semibold text-lg">
                UPI
              </AppText>
            </View>
          </View>

          {/* Divider */}
          <View className="border-t border-gray-700 mt-8 pt-5">
            <AppText className="text-gray-400 text-center">
              © 2025{" "}
              <AppText className="text-white font-semibold">
                Dhanalakshmi Jewellery
              </AppText>{" "}
              . All Rights Reserved.
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

function MapCard() {
  const html = `
  <html>
    <body style="margin:0">
      <iframe
        width="100%"
        height="100%"
        style="border:0"
        loading="lazy"
        allowfullscreen
        
        src="https://www.google.com/maps?q=SRI%20DHANALAKSHMI%20Jewellery%20%2C%20arcot&output=embed">
      </iframe>
    </body>
  </html>
  `;

  return (
    <View className="mx-5 h-72 rounded-xl overflow-hidden">
      <WebView source={{ html }} />
    </View>
  );
}
