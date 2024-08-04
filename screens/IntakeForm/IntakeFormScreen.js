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

import Colors from "../../helpers/Colors";
import ToastManager, { Toast } from "toastify-react-native";
import NavigationBar from "../../components/NavigationBar";
import MyStatusBar from "../../helpers/MyStatusBar";
import useIntakeFormOperations from "../../hooks/useIntakeFormOperations";

const IntakeFormScreen = ({ route }) => {
  const {
    renderCompletionIcon,
    handleCategoryPress,
    handleSubmitForm,
    handleUpdateForm,
    showComplaintAlert,
    showWarningAlert,
    completedCategories,
    isLoading,
    loading,
    form,
    user,
    categories,
    openControlPanel,
  } = useIntakeFormOperations({ route });

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
