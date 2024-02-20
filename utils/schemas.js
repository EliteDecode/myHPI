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
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters")
    .required("First name is required")
    .max(50, "First name must be at most 50 characters"),
  Lastname: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "Last name can only contain letters")
    .required("Last name is required")
    .max(50, "Last name must be at most 50 characters"),
  Email: Yup.string()
    .trim()
    .strict(true)
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must be at most 255 characters"),
  Password: Yup.string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(255, "Password must be at most 255 characters"),
  ConfirmPassword: Yup.string()
    .trim()
    .strict(true)
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm password is required")
    .max(255, "Confirm password must be at most 255 characters"),
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
  Firstname: Yup.string()
    .required("Firstname is required")
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters")
    .transform(removeWhiteSpace),
  Middlename: Yup.string()
    .required("Middlename is required")
    .matches(/^[a-zA-Z\s]*$/, "Middle name can only contain letters")
    .transform(removeWhiteSpace),
  Lastname: Yup.string()
    .required("Lastname is required")
    .matches(/^[a-zA-Z\s]*$/, "Last name can only contain letters")
    .transform(removeWhiteSpace),
  // Age: Yup.number().required("Age is required"),
  Sex: Yup.string().required("Sex assigned at birth is required"),
  Address: Yup.string().required("Address is required"),
  Phone: Yup.number().required("Mobile is required"),
  EmergencyContactName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Emergency contact name can only contain letters")
    .required("Emergency contact name is required"),
  EmergencyContactPhone: Yup.number().required(
    "Emergency contact mobile is required"
  ),
  EmergencyContactRelationship: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Relationship to emergency can only contain letters"
    )
    .required("Relationship to emergency contact is required"),
});

export const complaintSchema = Yup.object().shape({
  bodyPart: Yup.string().required("Body part is required"),
  duration: Yup.string().required("Please provide number of days/weeks/month"),
  quality: Yup.string().required(
    "Please describe sensation associated with the problem"
  ),
  severity: Yup.number().min(1).max(10),
  timing: Yup.string().required("Please provide when the pain occurs"),
  modifyingFactors: Yup.string().required(
    "Please provide what makes the pain better or worse"
  ),
  associatedSymptoms: Yup.string().required(
    "Please provide associated signs and symptoms"
  ),
  context: Yup.string().required("Please provide additional information"),
  recipientEmail: Yup.string()
    .transform(removeWhiteSpace)
    .email("Invalid email address")
    .required("Email is required"),
});
