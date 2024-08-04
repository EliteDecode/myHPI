import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  get_form,
  register_form,
  reset,
  update_form,
} from "../store/reducers/intakeForm/intakeFormSlice";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

const useIntakeFormOperations = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { form, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.form
  );
  const { openControlPanel } = route.params;

  const dispatch = useDispatch();

  const loggedInUserId = user?.data?._id;
  const [travelHistory, setTravelHistory] = useState();
  const [activeMedicalProblems, setActiveMedicalProblems] = useState();
  const [pastMedicalHistory, setPastMedicalHistory] = useState();
  const [sexualTransmittedDiseaseHistory, setSexualTransmittedDiseaseHistory] =
    useState();
  const [obstericHistory, setObstericHistory] = useState();
  const [surgicalHistory, setSurgicalHistory] = useState();
  const [familyHistory, setFamilyHistory] = useState();
  const [socialHistory, setSocialHistory] = useState();
  const [allergies, setAllergies] = useState();
  const [medications, setMedications] = useState();
  const [immunizations, setImmunizations] = useState();
  const [completedCategories, setCompletedCategories] = useState([]);

  const data = {
    travelHistory,
    activeMedicalProblems,
    pastMedicalHistory,
    sexualTransmittedDiseaseHistory,
    obstericHistory,
    surgicalHistory,
    familyHistory,
    socialHistory,
    allergies,
    medications,
    immunizations,
  };

  useEffect(() => {
    fetchForms();
    // dispatch(get_form());
    // resetLocalStorage();
    setLoading(true);
    turnOff();
    dispatch(reset());
  }, [route?.params]);

  useEffect(() => {
    dispatch(fetchFormData(user?.data?._id));
  }, []);

  useEffect(() => {
    if (
      isSuccess &&
      message === "Congratulations your intakeform has been submitted"
    ) {
      Alert.alert("Congratulations!", "Your form has been submitted", [
        {
          text: "OK",
          onPress: () => {
            dispatch(reset());
            resetLocalStorage();
            showComplaintAlert();
          },
        },
      ]);
    }

    // if (isError && message) {
    //   console.log(message);
    //   Alert.alert(
    //     "Information",
    //     "Something went wrong",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => {
    //           dispatch(reset());
    //         },
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // }

    if (isSuccess && message) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, message, form]);

  var categories = [];

  if (user?.data?.Sex == "Male") {
    categories.push(
      "Travel History",
      "Active Medical Problems",
      "Past Medical History",
      "Sexual Transmitted Disease History",
      "Surgical History",
      "Family History",
      "Social History",
      "Allergies",
      "Medications",
      "Immunizations"
    );
  } else {
    categories.push(
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
      "Immunizations"
    );
  }

  const resetLocalStorage = async () => {
    // Define the mappings between form fields and AsyncStorage keys
    const fieldToStorageKey = {
      travelHistory: "travelHistories",
      surgicalHistory: "surgicalHistoryProblems",
      socialHistory: "socialHistory",
      sexualTransmittedDiseaseHistory: "sexuallyTransmittedDiseaseHistory",
      pastMedicalHistory: "pastMedicalProblems",
      medications: "medications",
      immunizations: "immunizations",
      obstericHistory: "gynecologicalHistory",
      familyHistory: "familyHistoryProblems",
      allergies: "allergies",
      activeMedicalProblems: "activeMedicalProblems",
    };

    for (const [field, storageKey] of Object.entries(fieldToStorageKey)) {
      const value = form?.[field];

      // Check if the value is not null before setting it in AsyncStorage
      if (value !== null && value !== undefined) {
        await AsyncStorage.setItem(
          `${storageKey}_${loggedInUserId}`,
          JSON.stringify(value)
        );
      } else {
        // If the value is null, remove the corresponding item from AsyncStorage
        await AsyncStorage.removeItem(`${storageKey}_${loggedInUserId}`);
      }
    }
  };

  const fetchForms = async () => {
    const fetchAndSetData = async (key, stateSetter, category) => {
      const data = await AsyncStorage.getItem(`${key}_${loggedInUserId}`);

      if (data) {
        stateSetter(JSON.parse(data));
        const isDataArray = Array.isArray(JSON.parse(data));
        if (
          (isDataArray && data.length > 2) ||
          (!isDataArray && data.length > 0)
        ) {
          if (!completedCategories.includes(category)) {
            setCompletedCategories((prevCategories) => [
              ...prevCategories,
              category,
            ]);
          }
        } else {
          if (completedCategories.includes(category)) {
            setCompletedCategories((prevCategories) =>
              prevCategories.filter((cat) => cat !== category)
            );
          }
        }
      }
    };

    await fetchAndSetData(
      "travelHistories",
      setTravelHistory,
      "Travel History"
    );
    await fetchAndSetData(
      "activeMedicalProblems",
      setActiveMedicalProblems,
      "Active Medical Problems"
    );
    await fetchAndSetData(
      "pastMedicalProblems",
      setPastMedicalHistory,
      "Past Medical History"
    );
    await fetchAndSetData(
      "sexuallyTransmittedDiseaseHistory",
      setSexualTransmittedDiseaseHistory,
      "Sexual Transmitted Disease History"
    );
    await fetchAndSetData(
      "gynecologicalHistory",
      setObstericHistory,
      "Obstetric / Gynecological History"
    );
    await fetchAndSetData(
      "surgicalHistoryProblems",
      setSurgicalHistory,
      "Surgical History"
    );
    await fetchAndSetData(
      "familyHistoryProblems",
      setFamilyHistory,
      "Family History"
    );
    await fetchAndSetData("socialHistory", setSocialHistory, "Social History");
    await fetchAndSetData("allergies", setAllergies, "Allergies");
    await fetchAndSetData("medications", setMedications, "Medications");
    await fetchAndSetData("immunizations", setImmunizations, "Immunizations");
  };

  const turnOff = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleCategoryPress = (category) => {
    navigation.navigate(`${category} Form`, {
      screen: route.name,
    });
  };

  const showComplaintAlert = () => {
    Alert.alert(
      "Do you have a complaint today?",
      "Please share additional information with your health team",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Proceed",
          onPress: () => {
            navigation.navigate("Complaints", {
              screen: route.name,
            });
          },
        },
      ]
    );
  };

  const showWarningAlert = () => {
    Alert.alert(
      "Information",
      "Please complete all tabs to submit form",
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const handleSubmitForm = () => {
    dispatch(register_form(data));
  };

  const handleUpdateForm = () => {
    dispatch(update_form(data));
  };

  const renderCompletionIcon = (category) => {
    if (completedCategories.includes(category)) {
      return <Ionicons name="checkmark-done" size={24} color={Colors.green} />;
    } else {
      return <Ionicons name="information-sharp" size={24} color={Colors.red} />;
    }
  };

  return {
    renderCompletionIcon,
    handleCategoryPress,
    handleSubmitForm,
    handleUpdateForm,
    showComplaintAlert,
    completedCategories,
    isLoading,
    loading,
    user,
    categories,
    form,
    showWarningAlert,
    openControlPanel,
  };
};

export default useIntakeFormOperations;
