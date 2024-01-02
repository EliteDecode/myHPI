import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../helpers/Colors";
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ color, content }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(route?.params?.screen || "Home")}
        className=" py-2 flex-row space-x-2 items-center bg-white">
        <Ionicons
          name="arrow-back"
          size={30}
          color={color}
          style={{ marginLeft: 16 }}
        />
        <Text className="font-bold text-lg">{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
