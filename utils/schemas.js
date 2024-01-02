import * as Yup from "yup";

const removeWhiteSpace = (value) => (value ? value.trim() : value);

export const loginSchema = Yup.object({
  Email: Yup.string()
    .transform(removeWhiteSpace)
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .transform(removeWhiteSpace)
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  Firstname: Yup.string()
    .transform(removeWhiteSpace)
    .required("First name is required"),
  Lastname: Yup.string()
    .transform(removeWhiteSpace)
    .required("Last name is required"),
  Email: Yup.string()
    .transform(removeWhiteSpace)
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .transform(removeWhiteSpace)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .transform(removeWhiteSpace)
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const changePassword = Yup.object({
  Password: Yup.string()
    .transform(removeWhiteSpace)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Old password is required"),
  NewPassword: Yup.string()
    .transform(removeWhiteSpace)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("New password is required"),
  ConfirmNewPassword: Yup.string()
    .transform(removeWhiteSpace)
    .oneOf([Yup.ref("NewPassword"), null], "Passwords must match")
    .required("Confirm new password is required"),
});

export const updateProfileSchema = Yup.object().shape({
  Firstname: Yup.string(),
  Middlename: Yup.string(),
  Lastname: Yup.string(),
  DOB: Yup.date().required("Date of birth is required"),
  Age: Yup.number().required("Age is required"),
  Sex: Yup.string().required("Sex assigned at birth is required"),
  Address: Yup.string().required("Address is required"),
  Phone: Yup.number().required("Mobile is required"),
  EmergencyContactName: Yup.string().required(
    "Emergency contact name is required"
  ),
  EmergencyContactPhone: Yup.number().required(
    "Emergency contact mobile is required"
  ),
  EmergencyContactRelationship: Yup.string().required(
    "Relationship to emergency contact is required"
  ),
});
