import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../helpers/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  get_form,
  register_form,
  reset,
  update_form,
} from "../../store/reducers/intakeForm/intakeFormSlice";
import ToastManager, { Toast } from "toastify-react-native";
import NavigationBar from "../../components/NavigationBar";
import MyStatusBar from "../../helpers/MyStatusBar";

const IntakeFormScreen = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { form, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.form
  );
  const { openControlPanel } = route.params;

  console.log(form);

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
    }, 2000);
  };

  useEffect(() => {
    fetchForms();
    setLoading(true);
    turnOff();
    dispatch(reset());
  }, [route?.params]);

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

  useEffect(() => {
    dispatch(fetchFormData(user?.data?._id));
  }, []);

  const handleSubmitForm = () => {
    dispatch(register_form(data));
  };

  const handleUpdateForm = () => {
    dispatch(update_form(data));
  };
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

    if (isError && message) {
      Alert.alert(
        "Information",
        message,
        [
          {
            text: "OK",
            onPress: () => {
              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (isSuccess && message) {
      dispatch(reset());
    }

    if (isError) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, message, form]);

  const renderCompletionIcon = (category) => {
    if (completedCategories.includes(category)) {
      return <Ionicons name="checkmark-done" size={24} color={Colors.green} />;
    } else {
      return <Ionicons name="information-sharp" size={24} color={Colors.red} />;
    }
  };

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <MyStatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ToastManager
          textStyle={{ fontSize: 12 }}
          height={50}
          position="top"
          width={400}
        />
        <View style={{ flex: 1 }}>
          {loading && (
            <View className="px-4 py-3 mb-3 items-center justify-center flex-1">
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          )}

          {!loading && (
            <>
              <View className="px-4 py-2 mb-1">
                {!form ? (
                  <Text className="text-[15px]" style={{ fontFamily: "sen" }}>
                    Please fill up your details to submit your intake form
                  </Text>
                ) : (
                  <Text className="text-[15px]" style={{ fontFamily: "sen" }}>
                    Please if any change is made in any tab, click the update
                    your information and to save changes
                  </Text>
                )}
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}>
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
                {(user?.data?.Sex == "Male" &&
                  completedCategories.length < 10) ||
                (user?.data?.Sex !== "Male" &&
                  completedCategories.length < 11) ? (
                  <TouchableOpacity
                    className="rounded-full"
                    style={{
                      backgroundColor: Colors.gray,
                      paddingVertical: 18,
                    }}
                    onPress={showWarningAlert}>
                    <Text
                      style={{
                        color: "#a6a6a6",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      Complete All Tabs to Submit Form
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    {form ? (
                      <TouchableOpacity
                        className="rounded-full flex flex-row items-center justify-center"
                        style={{
                          backgroundColor: Colors.gray3,
                          paddingVertical: 18,
                        }}
                        onPress={isLoading ? null : handleUpdateForm}>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}>
                          {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            "Update Form"
                          )}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        className="rounded-full flex flex-row items-center justify-center"
                        style={{
                          backgroundColor: Colors.gray2,
                          paddingVertical: 18,
                        }}
                        onPress={isLoading ? null : handleSubmitForm}>
                        <Text
                          style={{
                            color: Colors.white,
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}>
                          {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            "Submit Form"
                          )}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
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
