import { FontAwesome } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

export const registerFields = [
  {
    title: "Firstname",
    placeholder: "Firstname",
    mode: "text",
    icon: (
      <FontAwesome
        name="user"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.6 }}
      />
    ),
  },
  {
    title: "Lastname",
    placeholder: "Lastname",
    mode: "text",
    icon: (
      <FontAwesome
        name="user"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.6 }}
      />
    ),
  },
  {
    title: "Email",
    mode: "text",
    placeholder: " Email Address",
    icon: (
      <FontAwesome
        name="envelope"
        size={15}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.6 }}
      />
    ),
  },
  {
    title: "Password",
    mode: "password",
    placeholder: "Password",
    icon: (
      <FontAwesome
        name="lock"
        size={20}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.6 }}
      />
    ),
  },
  {
    title: "Confirm Password",
    mode: "password",
    placeholder: "Confirm Password",
    icon: (
      <FontAwesome
        name="lock"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.6 }}
      />
    ),
  },
];
