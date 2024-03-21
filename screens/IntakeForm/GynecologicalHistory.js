import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik, formik } from "formik";
import * as yup from "yup";
import Colors from "../../helpers/Colors";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-element-textinput";
import BtnReturnIntakeForm from "../../components/BtnReturnIntakeForm";

const validationSchema = yup.object().shape({
  ageAtFirstPeriod: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s,.';:]*$/,
      "Age at First Period must not contain special characters"
    )
    .max(15, "Age at First Period must be at most 15 characters long")
    .required("Age at First Period is required"),
  lastMenstrualPeriod: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s,.';:]*$/,
      "Last Menstrual Period must not contain special characters"
    )
    .max(15, "Last Menstrual Period must be at most 15 characters long")
    .required("Last Menstrual Period is required"),
  ageAtMenopause: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s,.';:]*$/,
      "Age at Menopause must not contain special characters"
    )
    .max(15, "Age at Menopause must be at most 15 characters long")
    .required("Age at Menopause is required"),
});

const GynecologicalHistory = () => {
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
  const [initials, setInitialValues] = useState();

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedValues = await AsyncStorage.getItem(
          `gynecologicalHistory_${loggedInUserId}`
        );
        if (storedValues) {
          // Set the initial values in Formik
          setInitialValues(JSON.parse(storedValues));
        }
      } catch (error) {
        console.error("Error fetching values from local storage:", error);
      }
    };

    fetchInitialValues();
  }, [route, navigation]);

  const saveAndContinue = async (values) => {
    try {
      const loggedInUserId = user?.data?._id;

      await AsyncStorage.setItem(
        `gynecologicalHistory_${loggedInUserId}`,
        JSON.stringify(values)
      );
      navigation.navigate("Surgical History Form", {
        screen: route.name,
      });
    } catch (error) {
      console.error("Error saving values to local storage:", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            ageAtFirstPeriod: initials ? initials["ageAtFirstPeriod"] : "",
            lastMenstrualPeriod: initials
              ? initials["lastMenstrualPeriod"]
              : "",
            ageAtMenopause: initials ? initials["ageAtMenopause"] : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            saveAndContinue(values);
            resetForm();
          }}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            resetForm,
          }) => (
            <>
              {Object.entries(values).map(([field, value]) => (
                <View key={field} style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      marginBottom: 8,
                      color: Colors.gray2,
                    }}>
                    {field === "ageAtFirstPeriod"
                      ? "Age at First Period"
                      : field === "lastMenstrualPeriod"
                      ? "Last Menstrual Period"
                      : "Age at Menopause"}
                  </Text>
                  <TextInput
                    placeholder={`Enter ${
                      field === "ageAtFirstPeriod"
                        ? "Age at First Period"
                        : field === "lastMenstrualPeriod"
                        ? "Last Menstrual Period"
                        : "Age at Menopause"
                    }`}
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 12,
                      padding: 12,
                    }}
                    value={initials ? initials[field] : value}
                    onChangeText={handleChange(field)}
                  />

                  {touched[field] && errors[field] && (
                    <Text style={{ color: "red" }}>{errors[field]}</Text>
                  )}
                </View>
              ))}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}>
                <TouchableOpacity
                  onPress={() => resetForm()}
                  style={{
                    flex: 1,
                    backgroundColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 8,
                  }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
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
            </>
          )}
        </Formik>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      <BtnReturnIntakeForm />
    </View>
  );
};

export default GynecologicalHistory;
