import {
  Button,
  Dimensions,
  Image,
  ImageProps,
  ImageResizeMode,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextProps } from "react-native-svg";
import { ImageSourcePropType } from "react-native";
import React, { memo } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { ActivityIndicator } from "react-native";

export const { width, height } = Dimensions.get("screen");

type Props = TextProps & {
  className?: string;
};

export function AppText({ className, ...props }: Props) {
  return <Text {...props} className={`font-poppins ${className ?? ""}`} />;
}

type ImgProps = ImageProps & {
  src?: ImageSourcePropType;
  size?: number;
  className?: string;
  resize?: ImageResizeMode;
};

export const Img = memo(
  ({ src, size = 20, className = "", resize = "contain" }: ImgProps) => {
    return (
      <Image
        source={src}
        style={{ width: size, height: size }}
        className={className}
        resizeMode={resize}
      />
    );
  },
);

interface VideoScreenProps {
  videoSource: string; // URL or local asset
}

export function VideoScreen({ videoSource }: VideoScreenProps) {
  const player = useVideoPlayer(videoSource, (player) => {});

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        // fullscreenOptions={{ allowsFullscreen: true }}
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

export const Loader = () => {
  return (
    <View className=" justify-center items-center rounded-lg h-44 bg-white p-4 my-2">
      {/* Loader */}
      <ActivityIndicator size="large" color="black" className="mb-4" />
      <AppText className="text-lg font-semibold text-black">
        Fetching Data from Server
      </AppText>
    </View>
  );
};

export const Spinner = (params) => {
  return (
    <View className=" justify-center  flex items-center rounded-lg p-4">
      {/* Loader */}
      <ActivityIndicator size="small" color={params.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
