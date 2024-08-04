import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-element-textinput";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import IntakeFormTitle from "../../components/IntakeFormTitle";
import { useSelector } from "react-redux";
import BtnReturnIntakeForm from "../../components/BtnReturnIntakeForm";
import { textSchema } from "../../utils/schemas";
import { rMS, rVS } from "../../styles/responsiveness";

const TravelHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(route?.params?.screen || "IntakeForm")
          }>
          <Ionicons
            name="arrow-back"
            size={rMS(24)}
            color="#478AFB"
            style={{ marginLeft: rMS(16) }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route]);

  const [problems, setProblems] = useState([
    { id: new Date(), location: "", timeline: "" },
  ]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedProblems = await AsyncStorage.getItem(
          `travelHistories_${loggedInUserId}`
        );

        if (storedProblems) {
          setProblems(JSON.parse(storedProblems));
        }
      } catch (error) {
        console.error("Error fetching problems from local storage:", error);
      }
    };

    fetchProblems();
  }, [user]);

  const addProblemField = () => {
    const newId = new Date();
    setProblems([...problems, { id: newId, location: "", timeline: "" }]);
  };

  const handleLocationChange = (id, location) => {
    // Validate the text
    textSchema
      .validate(location)
      .then((validText) => {
        setError(null);
        // If text is valid, update the problems
        const updatedProblems = problems.map((problem) =>
          problem.id === id ? { ...problem, location } : problem
        );
        setProblems(updatedProblems);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleTimelineChange = (id, timeline) => {
    // Validate the text
    textSchema
      .validate(timeline)
      .then((validText) => {
        setError(null);
        // If text is valid, update the problems
        const updatedProblems = problems.map((problem) =>
          problem.id === id ? { ...problem, timeline } : problem
        );
        setProblems(updatedProblems);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const removeProblemField = (id) => {
    const updatedProblems = problems.filter((problem) => problem.id !== id);
    setProblems(updatedProblems);
  };

  const resetForm = () => {
    setProblems([{ id: new Date(), location: "", timeline: "" }]);
  };

  const saveAndContinue = async () => {
    try {
      const loggedInUserId = user?.data?._id;
      const filteredProblems = problems.filter(
        (problem) => problem.location !== "" && problem.timeline !== ""
      );
      await AsyncStorage.setItem(
        `travelHistories_${loggedInUserId}`,
        JSON.stringify(filteredProblems)
      );
      navigation.navigate("Active Medical Problems Form", {
        screen: route.name ? route : "IntakeForm",
      });
    } catch (error) {
      console.error("Error saving problems to local storage:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: rMS(16) }}>
      <Text
        className="text-[14px] opacity-80 mb-2"
        style={{ fontFamily: "sen" }}>
        Please enter your travel history for the past 4 weeks stating location
        and period of travel. Enter one item per box, click the "Add Item"
        button to add more
      </Text>
      <ScrollView
        className="space-y-4"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {problems.map((problem, index) => (
          <View className="border p-3 rounded-lg  border-gray-300" key={index}>
            <TextInput
              placeholder="Enter location here."
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: rMS(10),
                fontSize: "5px",
                marginBottom: rMS(12),
                height: rVS(35),
              }}
              placeholderTextColor="#ccc"
              value={problem.location}
              onChangeText={(text) => handleLocationChange(problem.id, text)}
            />

            <TextInput
              placeholder="Enter timeline here."
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: rMS(10),
                fontSize: rMS(10),
                marginBottom: rMS(12),
                height: rVS(35),
                // Add margin for spacing between inputs
              }}
              placeholderTextColor="#ccc"
              value={problem.timeline}
              onChangeText={(text) => handleTimelineChange(problem.id, text)}
            />

            <TouchableOpacity
              onPress={() => removeProblemField(problem.id)}
              className="mt-0">
              <MaterialIcons
                name="delete-forever"
                size={rMS(27)}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Text className="text-red-500 text-[12px] -mt-2 mb-2">
          {error?.message}
        </Text>
        <TouchableOpacity
          onPress={addProblemField}
          style={{
            backgroundColor: "#478AFB",
            padding: rMS(10),
            borderRadius: 5,
            marginBottom: rMS(12),
          }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}>
            Add Item
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            onPress={resetForm}
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              padding: rMS(10),
              borderRadius: 5,
              marginRight: rMS(8),
            }}>
            <Text style={{ color: "white", textAlign: "center" }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveAndContinue}
            style={{
              flex: 1,
              backgroundColor: "#478AFB",
              padding: rMS(10),
              borderRadius: 5,
            }}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Save & Continue
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: rMS(100) }} />
      </ScrollView>
      {/* Assuming BtnReturnIntakeForm is a custom component */}
      <BtnReturnIntakeForm />
    </View>
  );
};

export default TravelHistory;
