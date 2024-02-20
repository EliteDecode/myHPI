import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Colors from "../helpers/Colors";
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ color, content, font }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: route?.params?.screen || "Home" }],
            })
          )
        }
        className=" py-2 flex-row space-x-2 items-center bg-white">
        <Ionicons
          name="arrow-back"
          size={27}
          color={color}
          style={{ marginLeft: 16 }}
        />
        <Text className="text-[16px]">{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
