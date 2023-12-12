import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import Colors from "../../helpers/Colors";

const validationSchema = yup.object().shape({
  ageAtFirstPeriod: yup.string().required("Age at First Period is required"),
  lastMenstrualPeriod: yup
    .string()
    .required("Last Menstrual Period is required"),
  ageAtMenopause: yup.string().required("Age at Menopause is required"),
});

const GynecologicalHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();

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
  const saveAndContinue = (values) => {
    navigation.navigate("Surgical History", {
      screen: route.name,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            ageAtFirstPeriod: "",
            lastMenstrualPeriod: "",
            ageAtMenopause: "",
          }}
          // validationSchema={validationSchema}
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
                      fontFamily: "ca",
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
                    value={value}
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
    </View>
  );
};

export default GynecologicalHistory;
