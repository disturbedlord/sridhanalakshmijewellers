import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import banner1 from "../../assets/images/1.jpg";
import banner2 from "../../assets/images/2.jpg";
import banner3 from "../../assets/images/s1.jpeg";
import { scheduleOnRN } from "react-native-worklets";
import { height, width } from "../common";

const bannerImage = [banner1, banner2, banner3];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const opacity = useSharedValue(1);

  const changeIndex = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImage.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      opacity.value = withTiming(0, { duration: 500 }, () => {
        // Update index after fade out
        scheduleOnRN(changeIndex);

        // Fade in
        opacity.value = withTiming(1, { duration: 500 });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return (
    <View className="w-full relative">
      <Animated.Image
        source={bannerImage[currentIndex]}
        className="w-full aspect-[134/53]"
        style={[
          {
            width: width, // full device width
            height: (width * 530) / 1340, // maintain aspect ratio
            maxHeight: height * 0.4, // limit height to 40% of screen
          },
          animatedStyle,
        ]}
        resizeMode="cover"
      />

      <View className="absolute bottom-4 w-full flex-row justify-center gap-2">
        {bannerImage.map((_, i) => (
          <View
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
