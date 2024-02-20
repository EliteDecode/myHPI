import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewAppointments = () => {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleLoad = () => {
    setLoading(false);
  };

  const guestInfo = {
    name: "John Doe",
    email: "gospyjo@gmail.com",
  };

  const calendlyURL = `https://calendly.com/sirelite11?name=${user.data.Firstname}%20${user.data.Lastname}&email=${user?.data?.Email}`;

  const reloadPage = () => {
    if (webViewRef.current) {
      setLoading(true);
      webViewRef.current.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={reloadPage}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 16,
          }}>
          <Ionicons name="arrow-back" size={27} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: calendlyURL }}
        style={styles.webview}
        onLoad={handleLoad}
        startInLoadingState
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  webview: {
    flex: 1,
    marginTop: 40,
  },
});

export default NewAppointments;
