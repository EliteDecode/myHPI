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
import RNPickerSelect from "react-native-picker-select";
import { rMS, rVS } from "../../styles/responsiveness";

const PastMedicalHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState();
  const [problems, setProblems] = useState([
    { id: new Date(), problem: "", relativeType: "" },
  ]);

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

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedProblems = await AsyncStorage.getItem(
          `pastMedicalProblems_${loggedInUserId}`
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
    setProblems([...problems, { id: newId, problem: "", relativeType: "" }]);
  };

  const handleProblemChange = (id, text) => {
    // Validate the text
    textSchema
      .validate(text)
      .then((validText) => {
        setError(null);
        // If text is valid, update the problems
        const updatedProblems = problems.map((problem) =>
          problem.id === id ? { ...problem, problem: validText } : problem
        );
        setProblems(updatedProblems);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleRelativeTypeChange = (id, type) => {
    const updatedProblems = problems.map((problem) =>
      problem.id === id ? { ...problem, relativeType: type } : problem
    );
    setProblems(updatedProblems);
  };

  const removeProblemField = (id) => {
    const updatedProblems = problems.filter((problem) => problem.id !== id);
    setProblems(updatedProblems);
  };

  const resetForm = () => {
    setProblems([{ id: new Date(), problem: "", relativeType: "" }]);
  };

  const saveAndContinue = async () => {
    if (!error) {
      try {
        const loggedInUserId = user?.data?._id;
        const filteredProblems = problems.filter(
          (problem) => problem.problem !== ""
        );

        await AsyncStorage.setItem(
          `pastMedicalProblems_${loggedInUserId}`,
          JSON.stringify(filteredProblems)
        );

        navigation.navigate("Sexual Transmitted Disease History Form", {
          screen: route.name ? route : "IntakeForm",
        });
      } catch (error) {
        console.error("Error saving problems to local storage:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: rMS(16) }}>
      <IntakeFormTitle title="Past Medical History" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className="space-y-4">
        {problems.map((problem, index) => (
          <View className="border p-3 rounded-lg border-gray-300" key={index}>
            <View
              key={problem.id}
              className="flex flex-row items-center justify-center">
              <TextInput
                placeholder="Enter problem here."
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 12,
                  padding: rMS(12),
                  marginBottom: rMS(12),
                  height: rVS(35),
                }}
                value={problem.problem}
                onChangeText={(text) => handleProblemChange(problem.id, text)}
              />
            </View>
            <View
              className="my-2 border  border-[#ccc]"
              style={{ height: rVS(35), borderRadius: 12 }}>
              <RNPickerSelect
                placeholder={{
                  label: "Select relative's type...",
                  value: null,
                }}
                items={[
                  { label: "Father", value: "Father" },
                  { label: "Mother", value: "Mother" },
                  { label: "Maternal", value: "Maternal" },
                  { label: "Paternal", value: "Paternal" },
                  { label: "Sibling", value: "Sibling" },
                  { label: "Spouse", value: "Spouse" },
                  { label: "Others", value: "Other" },

                  // Add more options as needed
                ]}
                value={problem.relativeType}
                onValueChange={(value) =>
                  handleRelativeTypeChange(problem.id, value)
                }
                style={{
                  inputIOS: {
                    borderRadius: 10,
                    paddingHorizontal: rMS(13),
                    paddingVertical: rMS(16),
                  },
                  inputAndroid: {
                    borderRadius: 4,
                    paddingHorizontal: rMS(13),
                    paddingVertical: rMS(15),
                  },
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => removeProblemField(problem.id)}
              className="">
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
      <BtnReturnIntakeForm />
    </View>
  );
};

export default PastMedicalHistory;
