import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../helpers/Colors";

const IntakeFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const categories = [
    "Travel History",
    "Active Medical Problems",
    "Past Medical History",
    "Sexual Transmitted Disease History",
    "Obstetric / Gynecological History",
    "Surgical History",
    "Family History",
    "Social History",
    "Allergies",
    "Medications",
    "Immunizations",
  ];

  const completedCategories = new Set([
    "Past Medical History",
    "Surgical History",
  ]); // Example completed categories

  const handleCategoryPress = (category) => {
    navigation.navigate(category, {
      screen: route.name,
    });
  };

  const showCongratulationsAlert = () => {
    Alert.alert("Congratulations!", "Your form has been submitted", [
      {
        text: "OK",
        onPress: () => {
          console.log("Congratulations OK Pressed");
          // Call the second alert after the first one is closed
          showComplaintAlert();
        },
      },
    ]);
  };

  const showComplaintAlert = () => {
    Alert.alert(
      "Do you have a complaint today?",
      "Please share reasons why you need an appointment with your health team",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
        },

        {
          text: "Proceed",
          onPress: () => {
            navigation.navigate("New Complaint", {
              screen: route.name,
            });
          },
        },
      ]
    );
  };

  const renderCompletionIcon = (category) => {
    if (completedCategories.has(category)) {
      return <Ionicons name="checkmark-done" size={24} color={Colors.green} />;
    } else {
      return <Ionicons name="information-sharp" size={24} color={Colors.red} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <View className="px-4 py-3 mb-3">
          <Text className="text-[15px]" style={{ fontFamily: "sen" }}>
            Please fill up your details to submit your intake form
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              onPress={() => handleCategoryPress(category)}
              completionIcon={renderCompletionIcon(category)}
            />
          ))}
        </ScrollView>
        <View style={{ marginBottom: 70 }}></View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingTop: 16,
            paddingBottom: 5,
            paddingHorizontal: 20,
            backgroundColor: Colors.white,
          }}>
          <TouchableOpacity
            className="rounded-full"
            style={{ backgroundColor: Colors.gray2, paddingVertical: 18 }}
            onPress={showCongratulationsAlert}>
            <Text
              style={{
                color: Colors.white,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}>
              Submit Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CategoryItem = ({ category, onPress, completionIcon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginBottom: 16, backgroundColor: Colors.primary }}
      className=" py-1 px-2 rounded-xl">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}>
        <View className="flex-row items-center justify-center space-x-2">
          <View className=" px-1 py-0.5 rounded-full bg-white">
            {completionIcon}
          </View>

          <Text
            style={{
              fontSize: 16,
              color: Colors.white,
              fontWeight: "bold",
            }}>
            {category}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
};

export default IntakeFormScreen;
