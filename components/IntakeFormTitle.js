import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const IntakeFormTitle = ({ title }) => {
  const route = useRoute();

  return (
    <View className="mb-3">
      {/* <Text className="text-[18px]" style={{ fontFamily: "ca" }}>
        {title}
      </Text> */}
      <Text className="text-[14px] opacity-80" style={{ fontFamily: "sen" }}>
        Please enter{" "}
        {route.name === "Travel History"
          ? "travel history for the past 4 weeks"
          : ""}{" "}
        one item per box, click the "Add Item" button to add more{" "}
        <Text className="font-black">{title}.</Text> or enter null if no
        response
      </Text>
    </View>
  );
};

export default IntakeFormTitle;
