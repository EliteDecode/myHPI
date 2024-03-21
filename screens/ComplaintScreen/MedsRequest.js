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
import NavigationBar from "../../components/NavigationBar";

const MedsRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { complaint, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complaint
  );
  const [error, setError] = useState();

  const [problems, setProblems] = useState([
    { id: new Date(), medication: "" },
  ]);

  const addProblemField = () => {
    const newId = new Date();
    setProblems([...problems, { id: newId, medication: "" }]);
  };

  const handleMedicationChange = (id, medication) => {
    // Validate the text
    textSchema
      .validate(medication)
      .then((validText) => {
        setError(null);
        // If text is valid, update the problems
        const updatedProblems = problems.map((problem) =>
          problem.id === id ? { ...problem, medication } : problem
        );
        setProblems(updatedProblems);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };
  const removeProblemField = (id) => {
    const updatedProblems = problems.filter((problem) => problem.id !== id);
    setProblems(updatedProblems);
  };

  const resetForm = () => {
    setProblems([{ id: new Date(), medication: "" }]);
  };

  const { openControlPanel } = route.params;

  const handleSubmit = () => {
    console.log(problems);
  };

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        <ScrollView
          className="space-y-4"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {problems.map((problem, index) => (
            <View className="border p-3 rounded-lg border-gray-300" key={index}>
              <TextInput
                placeholder="Enter medication here."
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 12,
                  padding: 10,
                  fontSize: "5px",
                  marginBottom: 12,
                  height: 60,
                }}
                placeholderTextColor="#ccc"
                value={problem.medication}
                onChangeText={(text) =>
                  handleMedicationChange(problem.id, text)
                }
              />

              <TouchableOpacity
                onPress={() => removeProblemField(problem.id)}
                className="mt-0">
                <MaterialIcons
                  name="delete-forever"
                  size={34}
                  color={Colors.red}
                />
              </TouchableOpacity>
              <Text className="text-red-500 text-[12px]  mb-2">
                {error?.message}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            className="w-[40%]"
            onPress={addProblemField}
            style={{
              backgroundColor: "#478AFB",
              padding: 15,
              borderRadius: 5,
              marginBottom: 12,
            }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}>
              Add Medication
            </Text>
          </TouchableOpacity>
          <View>
            <Text>Doctor's Email</Text>
            <TextInput
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter doctor's email"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{ marginBottom: 10, marginTop: 10 }}>
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 30,
                paddingVertical: 18,
                alignItems: "center",
              }}>
              <Text
                style={{
                  color: "white",

                  fontSize: 16,
                  fontWeight: "bold",
                }}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Submit Request"
                )}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
    </>
  );
};

export default MedsRequest;
