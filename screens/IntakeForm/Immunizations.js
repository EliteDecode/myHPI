import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Immunizations = () => {
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

  const initialValues = {
    tetanusLastVaccineYear: "",
    covid: { selectedOption: null, date: "" },
    hepatitisA: { selectedOption: null, date: "" },
    hepatitisB: { selectedOption: null, date: "" },
    pneumonia: { selectedOption: null, date: "" },
    influenza: { selectedOption: null, date: "" },
    hpv: { selectedOption: null, date: "" },
  };

  const saveAndContinue = (values) => {
    navigation.navigate("IntakeForm");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => saveAndContinue(values)}>
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Tetanus (Year of Last Vaccine)
                </Text>
                <TextInput
                  placeholder="Enter year of last vaccine"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 12,
                    padding: 12,
                  }}
                  value={values.tetanusLastVaccineYear}
                  onChangeText={handleChange("tetanusLastVaccineYear")}
                />
              </View>

              {/* Other immunizations */}
              {[
                "covid",
                "hepatitisA",
                "hepatitisB",
                "pneumonia",
                "influenza",
                "hpv",
              ].map((vaccine) => (
                <View key={vaccine} style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: Colors.gray2,

                      marginBottom: 8,
                    }}>
                    {vaccine.charAt(0).toUpperCase() + vaccine.slice(1)}
                  </Text>
                  <View className="my-2">
                    <RNPickerSelect
                      placeholder={{ label: "Select", value: null }}
                      onValueChange={(value) =>
                        handleChange(`${vaccine}.selectedOption`)(value)
                      }
                      items={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </View>
                  {values[vaccine].selectedOption === "Yes" && (
                    <TextInput
                      placeholder="Date"
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 15,
                      }}
                      value={values[vaccine].date}
                      onChangeText={handleChange(`${vaccine}.date`)}
                    />
                  )}
                </View>
              ))}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
                className="space-x-4">
                <TouchableOpacity
                  onPress={() => resetForm()}
                  style={{
                    flex: 1,
                    backgroundColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
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
                    marginRight: 8,
                  }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Complete
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

export default Immunizations;
