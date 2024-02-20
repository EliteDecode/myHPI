import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

const TermsAndConditionsView = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 py-16 bg-white">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className=" py-2 flex-row space-x-2 items-center bg-white">
          <Ionicons
            name="arrow-back"
            size={27}
            color={Colors.primary}
            style={{ marginLeft: 16 }}
          />
          <Text className="text-[16px]">Go Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>General Terms and Conditions</Text>

        <Text style={styles.paragraph}>
          BY DOWNLOADING, REGISTERING FOR ACCESS, ACCESSING, OR USING ANY OF THE
          SERVICES AT WHICH THESE TERMS ARE POSTED, OR BY AFFIRMING ACCEPTANCE
          OF THESE TERMS, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREED
          TO BE BOUND BY THESE TERMS AND OUR PRIVACY POLICY. IF YOU DO NOT
          AGREE, DO NOT USE THE SERVICES OR ANY PART THEREOF.
        </Text>

        <Text style={styles.paragraph}>
          MyHPI grants you a personal, limited, revocable, non-exclusive,
          nontransferable right to access and use the Services and Content for
          your personal and noncommercial use only.
        </Text>

        <Text style={styles.paragraph}>
          MyHPI may revise and update these Terms and Conditions at any time.
          Your continued usage of MyHPI will mean you accept those changes.
        </Text>

        <Text style={styles.title}>MyHPI does Not Provide Medical Advice</Text>

        <Text style={styles.paragraph}>
          The contents of the MyHPI, such as text, graphics, images, and other
          materials created by MyHPI or obtained from MyHPI licensors, and other
          materials contained on the MyHPI Site/App (collectively, "Content")
          are for informational purposes only.
        </Text>

        <Text style={styles.title}>
          Content and Intellectual Property Information
        </Text>

        <Text style={styles.paragraph}>
          You shall not use the MyHPI Marks without the express, written
          permission of Healow. Any third party trademark(s) that may appear on
          or in connection with the Services are the property of their
          respective owner(s).
        </Text>

        <Text style={styles.paragraph}>
          The proprietary contents of the Services include, without limitation,
          the animations, applets, audio, data, design, graphics, illustrations,
          images, information, MyHPI Marks, music, photographs, text, video, and
          any other files displayed, used and/or available on or through the
          Services (the “Content”), as well as the arrangement, coordination,
          design, expression, look and feel, selection, and structure of such
          Content. The Content is owned, controlled, or licensed by or to MyHPI,
          and is protected by copyright, trade dress, trademark, and other
          intellectual property rights and unfair competition laws. MyHPI
          reserves all rights, title, and interests in the Content and the
          Services.
        </Text>

        <Text style={styles.paragraph}>
          Except as expressly provided in these Terms or by MyHPI's express
          written consent, you shall not copy, modify, reformat, lease, loan,
          sell, distribute, encode, post, publicly display, publish, republish,
          reverse engineer, reproduce, derive creative works from, translate,
          upload, or otherwise exploit in any manner any part of the Services
          and Content.
        </Text>

        <Text style={styles.paragraph}>
          The Content is not intended to be a substitute for professional
          medical advice, diagnosis, or treatment. Always seek the advice of
          your physician or other qualified health provider with any questions
          you may have regarding a medical condition. Never disregard
          professional medical advice or delay in seeking it because of
          something you have read on the MyHPI!
        </Text>

        <Text style={styles.paragraph}>
          If you think you may have a medical emergency, call your doctor
          immediately. MyHPI does not recommend or endorse any specific tests,
          physicians, products, procedures, opinions, or other information that
          may be mentioned on the Site. Reliance on any information provided by
          MyHPI is solely at your own risk.
        </Text>

        <Text style={styles.title}>Children's Privacy:</Text>

        <Text style={styles.paragraph}>
          We are committed to protecting the privacy of children. You should be
          aware that this Site is not intended or designed to attract children
          under the age of 13. We do not collect personally identifiable
          information from any person we actually know is a child under the age
          of 13.
        </Text>

        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>Effective Date: January 20, 2024</Text>

        <Text style={styles.sectionTitle}>1. Introduction :</Text>
        <Text style={styles.listItem}>
          1.1. This Privacy Policy (this “Privacy Policy”) informs you what
          Personal Information "MyHPI" (“we,” “us,” or “our”) may collect, how
          MyHPI collects such Personal Information, how MyHPI uses such Personal
          Information in connection with the Services we provide to you or our
          customers (i.e., users, clients, patients), and your choices related
          to your Personal Information.
        </Text>

        <Text style={styles.listItem}>
          1.1.1. “Services” means MyHPI products and services, such as our
          software and mobile applications, etc.
        </Text>

        <Text style={styles.listItem}>
          1.2. In this Privacy Policy, we do not include Protected Health
          Information in the definition of Personal Information because, as
          discussed in Sections 2 and 4, Protected Health Information has
          different treatment under HIPAA (as defined below), other applicable
          laws, and the Customer Documents (as defined below). Accordingly,
          because Protected Health Information is handled differently under the
          Customer Documents, if you are a patient of a health Provider (as
          defined below), your Protected Health Information is subject to the
          Customer Documents and your Provider’s terms of service and privacy
          practices.
        </Text>

        <Text style={styles.listItem}>
          1.3. This Privacy Policy applies wherever it is posted, and it is part
          of and incorporated into applicable Terms of Use Agreements ("Terms of
          Use") for the Sites, the Portals, and other Services, and into any
          applicable Terms and Conditions for our software and mobile
          applications ("Terms and Conditions"). Any terms capitalized herein
          but not defined shall have the meanings assigned to such terms in the
          applicable Terms of Use or Terms and Conditions. By visiting or using
          the Services or otherwise affirming the acceptance of an agreement
          into which this Privacy Policy is incorporated by reference, you
          acknowledge and agree to accept the practices described in this
          Privacy Policy regarding the collection, use, disclosure, and transfer
          of your Personal Information. If you do not agree to the terms of this
          Privacy Policy, please do not use the Services.
        </Text>

        <Text style={styles.listItem}>
          1.4. Please note that some privacy rights and obligations may differ
          in certain locations based on local law, in which case MyHPI will
          comply with the local legal requirements. MyHPI reserves the right, at
          any time, to modify this Privacy Policy. If we make revisions that
          change the way we collect, use, or share Personal Information, we will
          post those changes in this Privacy Policy. If we make material changes
          to our Privacy Policy, we may also notify you by other means prior to
          the changes taking effect, such as by posting a notice on our Site/App
          or sending you a notification. You should review this Privacy Policy
          periodically so that you keep up to date on our most current policies
          and practices. healow will note the effective date of the latest
          version of our Privacy Policy at the beginning of this Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>
          1. MyHPI is a tool for documenting your history of present illness for
          your medical provider.
        </Text>
        <Text style={styles.paragraph}>
          MyHPI does not provide medical advice, diagnosis or treatment.
        </Text>

        <Text style={styles.listItem}>
          2. All information provided by the "user" is voluntary.
        </Text>
        <Text style={styles.listItem}>
          3. All medical information is provided to your medical provider in
          order to populate your visit history.
        </Text>
        <Text style={styles.listItem}>
          4. MyHPI cannot and must not be used as a diagnostic tool, the user
          agrees to seek the expertise of a Medical practitioner for all medical
          complaints.
        </Text>

        <Text style={styles.sectionTitle}>
          *Data we may collect or may be provided voluntarily by the user:*
        </Text>
        <Text style={styles.listItem}>
          1. Demographic information provided during registration.
        </Text>
        <Text style={styles.listItem}>2. Medical information.</Text>
        <Text style={styles.listItem}>3. Locational information.</Text>
        <Text style={styles.listItem}>4. Contact information.</Text>

        <Text style={styles.sectionTitle}>*Use of Information*</Text>
        <Text style={styles.listItem}>
          1. Information provided by the user may be used to provide services
          and improve services we may provide.
        </Text>
        <Text style={styles.listItem}>
          2. Information may be used to suggest additional services.
        </Text>

        <Text style={styles.sectionTitle}>*Information Privacy*</Text>
        <Text style={styles.listItem}>
          1. Your information will be held confidential and will never be sold.
        </Text>
        <Text style={styles.listItem}>
          2. You have the right to terminate your account and delete your
          information at any time.
        </Text>

        <Text style={styles.sectionTitle}>*Disclaimer*</Text>
        <Text style={styles.listItem}>
          1. MyHPI does not provide any healthcare services.
        </Text>
        <Text style={styles.listItem}>
          2. You acknowledge that data conversion and transmission in the
          Services is subject to the possibility of human and machine errors,
          omissions, delays and losses, including inadvertent loss of data or
          damage to media, that may give rise to loss or damage.
        </Text>

        <Text style={styles.title}>5. Access and Use of the Services:</Text>

        <Text style={styles.paragraph}>
          MyHPI uses the means it believes are reasonable to provide access to
          the Services 24 hours a day, 7 days a week, and to provide necessary
          repair or maintenance operations required for the smooth operation of
          the Services. MyHPI disclaims any liability for any failure or
          deficiency in the performance of the Services for any reason whether
          such reason be maintenance, breakdown or any event beyond MyHPI's
          reasonable control.
        </Text>

        <Text style={styles.paragraph}>
          You acknowledge that data conversion and transmission in the Services
          is subject to the possibility of human and machine errors, omissions,
          delays and losses, including inadvertent loss of data or damage to
          media, that may give rise to loss or damage. MyHPI disclaims any
          liability for any such errors, omissions, delays, or losses. You
          acknowledge and agree that access, use, or download of the Services
          through connection to the Internet and/or use of mobile devices is
          inherently insecure and that information transmitted and received
          through such use may be subject to unauthorized interception,
          diversion, corruption, loss, access, and disclosure. MyHPI disclaims
          any liability for any adverse consequences whatsoever of your access,
          use, or download of the Services through such connection the Internet,
          and/or such use of mobile devices, and disclaims any liability for any
          use by you of an Internet connection in violation of any Applicable
          Laws (defined below), or any violation of the intellectual property
          rights of another.
        </Text>

        <Text style={styles.paragraph}>
          To access, use, or download the Services, you may be required to
          provide MyHPI with information about yourself (or the person or entity
          on whose behalf you are accessing, using or downloading the Services).
          This information may include your name, email address, and telephone
          number. By submitting such information to MyHPI, you hereby represent
          and warrant that any and all such information that you provide to
          MyHPI is true and correct, and you authorize MyHPI to use any method
          it chooses to verify the truth and accuracy of the information to the
          extent MyHPI needs to do so to protect its rights or other users of
          the Services. MyHPI may terminate your access to the Services if you
          fail to provide truthful and accurate information.
        </Text>

        <Text style={styles.sectionTitle}>5.1. Account Management</Text>
        <Text style={styles.paragraph}>
          Some functionality of the Services (e.g., the Portals) requires you to
          have a user account associated with a username, password and/or PIN
          (“Account Credentials”) to securely access the functionality. Other
          functionality of the Services that may be accessed without Account
          Credentials is not subject to the same security and protections as the
          functions accessed using Account Credentials.
        </Text>

        <Text style={styles.paragraph}>
          You are solely responsible for maintaining the strict confidentiality
          of your Account Credentials. You shall not share your Account
          Credentials with any other person and shall not permit any other
          person to access, use or download the Services using your Account
          Credentials. You will be solely responsible for any damages or losses
          that may be incurred or suffered by MyHPI as a result of your failure
          to maintain the strict confidentiality of your Account Credentials.
          MyHPI disclaims any liability for any harm related to the
          misappropriation of your Account Credentials, your intentional or
          negligent disclosure of such Account Credentials to another person, or
          your unauthorized sharing of Account Credentials that may allow
          another person or entity to access, use, or download the Services
          without MyHPI's authorization. You shall not register for more than
          one account for any Service, including each website and application
          which may be available. You shall not utilize alter-egos or other
          disguised identities when accessing, using, or downloading the
          Services. We prohibit all forms of indirect and “spoofed” access.
        </Text>

        <Text style={styles.sectionTitle}>5.2. Children and Minors</Text>
        <Text style={styles.paragraph}>
          If you are under 13 years old, you may not access, use or download the
          Services. If you are a minor (between 13 and 17 years of age) using
          these Services, your healthcare provider is responsible for ensuring a
          parent or legal guardian has provided written consent for your use of
          these Services, unless applicable laws allow your healthcare provider
          to provide their care or services to you without such consent. Your
          healthcare provider is responsible for obtaining any required written
          consent prior to the use. Please contact your healthcare provider for
          questions pertaining to consents. By accessing, using or downloading
          any of the Services, you represent and warrant that you are 18 years
          old or older, or otherwise that your parent(s) or guardian(s) have
          consented in writing to your use of the Services.
        </Text>

        <Text style={styles.sectionTitle}>
          5.3. Acceptance of Messaging and Data Fees
        </Text>
        <Text style={styles.paragraph}>
          While there may not be fees associated with your download of the
          Services, You acknowledge and agree that You are subject to standard
          text messaging and data use rates set by your telecommunications
          carrier that are used in connection with the Services.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 18,
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  listItem: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default TermsAndConditionsView;
