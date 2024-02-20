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

const ActiveMedicalProblemsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(route?.params?.screen || "IntakeForm")
          }>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#478AFB"
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route]);

  const [problems, setProblems] = useState([{ id: new Date(), value: "" }]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedProblems = await AsyncStorage.getItem(
          `activeMedicalProblems_${loggedInUserId}`
        );

        if (storedProblems) {
          setProblems(JSON.parse(storedProblems));
        }
      } catch (error) {
        console.error("Error fetching problems from local storage:", error);
      }
    };

    fetchProblems();
  }, [route, navigation]);

  const addProblemField = () => {
    const newId = new Date();
    setProblems([...problems, { id: newId, value: "" }]);
  };

  const handleProblemChange = (id, text) => {
    const updatedProblems = problems.map((problem) =>
      problem.id === id ? { ...problem, value: text } : problem
    );
    setProblems(updatedProblems);
  };

  const removeProblemField = (id) => {
    const updatedProblems = problems.filter((problem) => problem.id !== id);
    setProblems(updatedProblems);
  };

  const resetForm = () => {
    setProblems([{ id: 1, value: "" }]);
  };

  const saveAndContinue = async () => {
    try {
      const loggedInUserId = user?.data?._id;
      const filteredProblems = problems.filter(
        (problem) => problem.value !== ""
      );

      await AsyncStorage.setItem(
        `activeMedicalProblems_${loggedInUserId}`,
        JSON.stringify(filteredProblems)
      );

      navigation.navigate("Past Medical History Form", {
        screen: route.name ? route : "IntakeForm",
      });
    } catch (error) {
      console.error("Error saving problems to local storage:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <IntakeFormTitle title="Active Medical Problems" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {problems.map((problem) => (
          <View
            key={problem.id}
            className="flex flex-row items-center justify-center">
            <TextInput
              placeholder="e.g. Diabetes"
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                fontFamily: "sen",
                height: 60,
              }}
              value={problem.value}
              onChangeText={(text) => handleProblemChange(problem.id, text)}
            />
            <TouchableOpacity
              onPress={() => removeProblemField(problem.id)}
              className="-mt-3">
              <MaterialIcons
                name="delete-forever"
                style={{ marginLeft: 8 }}
                size={34}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          onPress={addProblemField}
          style={{
            backgroundColor: "#478AFB",
            padding: 10,
            borderRadius: 5,
            marginBottom: 12,
          }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}>
            Add Item
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={resetForm}
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginRight: 8,
            }}>
            <Text style={{ color: "white", textAlign: "center" }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveAndContinue}
            style={{
              flex: 1,
              backgroundColor: "#478AFB",
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Save & Continue
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      <BtnReturnIntakeForm />
    </View>
  );
};

export default ActiveMedicalProblemsScreen;
