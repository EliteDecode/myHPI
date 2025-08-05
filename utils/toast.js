import { Alert } from "react-native";

// Simple toast implementation using Alert for now
// You can enhance this later with a more sophisticated toast system

export const showToast = (message, type = "success") => {
  Alert.alert(
    type === "success"
      ? "Success"
      : type === "error"
      ? "Error"
      : type === "warning"
      ? "Warning"
      : "Info",
    message,
    [{ text: "OK" }],
    { cancelable: true }
  );
};

export const showSuccessToast = (message) => {
  showToast(message, "success");
};

export const showErrorToast = (message) => {
  showToast(message, "error");
};

export const showWarningToast = (message) => {
  showToast(message, "warning");
};

export const showInfoToast = (message) => {
  showToast(message, "info");
};

// For backward compatibility with existing code
export const Toast = {
  show: showToast,
  success: showSuccessToast,
  error: showErrorToast,
  warning: showWarningToast,
  info: showInfoToast,
};

export default Toast;
