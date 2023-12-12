import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function NewAppointments() {
  const Client_ID =
    "497927092297-8v7ugr8gt7rvp1q8d7o9vfm31boqe5he.apps.googleusercontent.com";
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Client_ID,
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  console.log(events);

  const getGoogleCalendarEvents = async () => {
    const month = 6;
    const timeMin = new Date(2023, month - 1, 1, 0, 0, 0).toISOString();
    const timeMax = new Date(2023, month, 0, 23, 59, 59).toISOString();
    const apiKey = "ef9157ae6d83596bbc42a0f4c9199564dfc75031"; // Replace with your actual API key

    try {
      const calendarId = "primary"; // Use "primary" for the primary calendar

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}`
      );

      const data = await response.json();
      setEvents(data.items);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGoogleCalendarEvents();
  }, [response, token]);

  return (
    <View style={styles.container}>
      {!token ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          <Button title="Events" onPress={getGoogleCalendarEvents} />
          {!!events.length &&
            events.map((item) => (
              <Text key={item.id} style={styles.text}>
                {item.summary}
              </Text>
            ))}
        </View>
      )}
      {/* <Text>Coming Soon...</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
