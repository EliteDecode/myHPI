import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";

const BtnReturnIntakeForm = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "IntakeForm" }],
            })
          )
        }
        style={{ position: "fixed", bottom: 5 }}
        className=" bg-[#e7e7e7] py-3 text-center rounded-md shadow-md flex-row items-center justify-center">
        <View className="flex-row items-center space-x-1">
          <Ionicons
            name="arrow-back"
            size={20}
            color="#478AFB"
            style={{ marginLeft: 16 }}
          />
          <Text>View all tabs</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BtnReturnIntakeForm;
