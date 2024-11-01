import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
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

const SurgicalHistory = () => {
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

  const [problems, setProblems] = useState([{ id: new Date(), value: "" }]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedProblems = await AsyncStorage.getItem(
          `surgicalHistoryProblems_${loggedInUserId}`
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
    // Validate the text
    textSchema
      .validate(text)
      .then((validText) => {
        setError(null);
        // If text is valid, update the problems
        const updatedProblems = problems.map((problem) =>
          problem.id === id ? { ...problem, value: validText } : problem
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
    setProblems([{ id: 1, value: "" }]);
  };

  const saveAndContinue = async () => {
    if (!error) {
      try {
        const loggedInUserId = user?.data?._id;

        const filteredProblems = problems.filter(
          (problem) => problem.value !== ""
        );

        await AsyncStorage.setItem(
          `surgicalHistoryProblems_${loggedInUserId}`,
          JSON.stringify(filteredProblems)
        );

        navigation.navigate("Family History Form", {
          screen: route.name ? route : "IntakeForm",
        });
      } catch (error) {
        console.error("Error saving problems to local storage:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: rMS(16) }}>
      <IntakeFormTitle title="Surgical History Form" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {problems.map((problem) => (
          <View
            key={problem.id}
            className="flex flex-row items-center justify-center">
            <TextInput
              placeholder="Enter item here."
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: rMS(12),
                marginBottom: rMS(12),
                height: Platform.OS == "ios" ? 60 : 58,
              }}
              value={problem.value}
              onChangeText={(text) => handleProblemChange(problem.id, text)}
            />
            <TouchableOpacity
              onPress={() => removeProblemField(problem.id)}
              className="-mt-3">
              <MaterialIcons
                name="delete-forever"
                style={{ marginLeft: rMS(8) }}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

export default SurgicalHistory;
