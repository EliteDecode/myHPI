import { View, Text } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton";
import Colors from "../../helpers/Colors";

const AskKemiScreen = () => {
  return (
    <>
      <BackButton color={Colors.primary} />
      <View className="flex-1 bg-white items-center text-center justify-center">
        <Text>Coming Soon...</Text>
      </View>
    </>
  );
};

export default AskKemiScreen;
