import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

const CustomToast = ({
  visible,
  message,
  type = "success",
  onHide,
  duration = 3000,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "#4CAF50", icon: "checkmark-circle" };
      case "error":
        return { backgroundColor: "#F44336", icon: "close-circle" };
      case "warning":
        return { backgroundColor: "#FF9800", icon: "warning" };
      case "info":
        return { backgroundColor: "#2196F3", icon: "information-circle" };
      default:
        return { backgroundColor: Colors.primary, icon: "checkmark-circle" };
    }
  };

  const toastStyle = getToastStyle();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: toastStyle.backgroundColor,
        },
      ]}>
      <View style={styles.content}>
        <Ionicons
          name={toastStyle.icon}
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    padding: 4,
  },
});

export default CustomToast;
