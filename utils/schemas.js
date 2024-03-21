import * as Yup from "yup";

const removeWhiteSpace = (value) => (value ? value.trim() : value);

export const loginSchema = Yup.object({
  Email: Yup.string()
    .trim()
    .strict(true)
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Email must be at most 50 characters"),
  Password: Yup.string()
    .transform(removeWhiteSpace)
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  Firstname: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters")
    .required("First name is required")
    .max(30, "First name must be at most 30 characters"),
  Lastname: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "Last name can only contain letters")
    .required("Last name is required")
    .max(30, "Last name must be at most 30 characters"),
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(15, "Password must be at most 15 characters"),

  ConfirmPassword: Yup.string()
    .trim()
    .strict(true)
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm password is required")
    .max(15, "Confirm password must be at most 15 characters"),
});

export const changePassword = Yup.object({
  Password: Yup.string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(15, "Password must be at most 15 characters"),
  NewPassword: Yup.string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(15, "Password must be at most 15 characters"),
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
    // .required("Middlename is required")
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
  bodyPart: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Body part must not contain special characters"
    )
    .max(45, "Body part must be at most 45 characters long")
    .required("Body part is required"),
  duration: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Duration must not contain special characters"
    )
    .max(45, "Duration must be at most 45 characters long")
    .required("Please provide number of days/weeks/month"),
  quality: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Quality must not contain special characters"
    )
    .max(45, "Quality must be at most 45 characters long")
    .required("Please describe sensation associated with the problem"),
  severity: Yup.number().min(1).max(10),
  timing: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Timing must not contain special characters"
    )
    .max(45, "Timing must be at most 45 characters long")
    .required("Please provide when the pain occurs"),
  modifyingFactors: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Modifying factors must not contain special characters"
    )
    .max(45, "Modifying factors must be at most 45 characters long")
    .required("Please provide what makes the pain better"),
  modifyingFactorsWorse: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Modifying factors worse must not contain special characters"
    )
    .max(45, "Modifying factors worse must be at most 45 characters long")
    .required("Please provide what makes the pain worse"),
  associatedSymptoms: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Associated symptoms must not contain special characters"
    )
    .max(45, "Associated symptoms must be at most 45 characters long")
    .required("Please provide associated signs and symptoms"),
  context: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,'.;:]*$/,
      "Context must not contain special characters"
    )
    .max(200, "Context must be at most 200 characters long")
    .required("Please provide additional information"),
  // recipientEmail: Yup.string()
  //   .transform(removeWhiteSpace)
  //   .email("Invalid email address")
  //   .required("Email is required"),
});

export const textSchema = Yup.string()
  .matches(/^[a-zA-Z0-9\s,'.;:]*$/, "Text must not contain special characters")
  .max(45, "Text must be at most 15 characters long");
