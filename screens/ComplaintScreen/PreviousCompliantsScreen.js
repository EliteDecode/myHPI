import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../helpers/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const PreviousComplaintsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleEdit = (id) => {
    // Display an alert to confirm if the user wants to edit
    Alert.alert(
      "Confirm Edit",
      "Are you sure you want to edit this complaint?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Edit Cancelled"),
        },
        {
          text: "Proceed",
          onPress: () => {
            navigation.navigate("Edit Complaints", {
              complaintId: id,
              screen: route.name,
            });
          },
        },
      ]
    );
  };
  const [accordions, setAccordions] = useState([
    {
      id: 1,
      location: "Head",
      duration: "2 days",
      quality: "Sharp",
      severity: 7,
      timing: "Morning",
      modifyingFactors: "Rest",
      associatedSymptoms: "Nausea",
      context: "At work",
    },
    {
      id: 2,
      location: "Back",
      duration: "1 week",
      quality: "Dull",
      severity: 5,
      timing: "Afternoon",
      modifyingFactors: "Movement",
      associatedSymptoms: "None",
      context: "At home",
    },

    {
      id: 3,
      location: "Abdomen",
      duration: "3 days",
      quality: "Cramping",
      severity: 8,
      timing: "Evening",
      modifyingFactors: "Medication",
      associatedSymptoms: "Bloating",
      context: "During meals",
    },
  ]);

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <View className="flex-1">
      <BackButton color={Colors.primary} />
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        {accordions.map((complaint) => (
          <View key={complaint.id} style={styles.accordionContainer}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleAccordion(complaint.id)}>
              <View>
                <Text style={styles.accordionHeaderText}>
                  {complaint.location}
                </Text>
                <Text
                  className="text-[14px]"
                  style={{ color: Colors.gray, fontFamily: "sen" }}>
                  Duration: {complaint.duration}
                </Text>
              </View>
              <Icon
                name={
                  activeAccordion === complaint.id
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Collapsible collapsed={activeAccordion !== complaint.id}>
              <View style={styles.accordionContent} className="p-5 space-y-4">
                <View style={styles.gridContainer}>
                  <View style={styles.gridItemStart}>
                    <Text style={styles.labelText}>Location:</Text>
                    <Text style={styles.detailText}>{complaint.location}</Text>
                  </View>
                  <View style={styles.gridItemEnd}>
                    <Text style={styles.labelText}>Duration:</Text>
                    <Text style={styles.detailText}>{complaint.duration}</Text>
                  </View>
                </View>

                <View style={styles.gridContainer}>
                  <View style={styles.gridItemStart}>
                    <Text style={styles.labelText}>Quality:</Text>
                    <Text style={styles.detailText}>{complaint.quality}</Text>
                  </View>
                  <View style={styles.gridItemEnd}>
                    <Text style={styles.labelText}>Severity:</Text>
                    <Text style={styles.detailText}>{complaint.severity}</Text>
                  </View>
                </View>

                <View style={styles.gridContainer}>
                  <View style={styles.gridItemStart}>
                    <Text style={styles.labelText}>Timing:</Text>
                    <Text style={styles.detailText}>{complaint.timing}</Text>
                  </View>
                  <View style={styles.gridItemEnd}>
                    <Text style={styles.labelText}>Modifying Factors:</Text>
                    <Text style={styles.detailText}>
                      {complaint.modifyingFactors}
                    </Text>
                  </View>
                </View>

                <View style={styles.gridContainer}>
                  <View style={styles.gridItemStart}>
                    <Text style={styles.labelText}>Associated Symptoms:</Text>
                    <Text style={styles.detailText}>
                      {complaint.associatedSymptoms}
                    </Text>
                  </View>
                  <View style={styles.gridItemEnd}>
                    <Text style={styles.labelText}>Context:</Text>
                    <Text style={styles.detailText}>{complaint.context}</Text>
                  </View>
                </View>
                <View className="flex-row space-x-2">
                  <MaterialIcons
                    name="delete-forever"
                    className="cursor-pointer"
                    size={24}
                    color={Colors.red}
                  />
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color={Colors.primary}
                    className="cursor-pointer"
                    onPress={() => handleEdit(complaint.id)}
                  />
                </View>
              </View>
            </Collapsible>
          </View>
        ))}
        <View style={{ marginBottom: 200 }} />
      </ScrollView>
    </View>
  );
};

const styles = {
  accordionContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#478AFB",
    borderRadius: 8,
  },
  accordionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  accordionContent: {
    paddingVertical: 12,
    paddingVertical: 12,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  gridItemStart: {
    flex: 1,
    marginRight: 8,
  },
  gridItemEnd: {
    flex: 1,
    marginLeft: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,

    color: Colors.black,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "sen",
    color: Colors.gray2,
  },
};

export default PreviousComplaintsScreen;
